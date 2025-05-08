import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import type { ItemRegistry as ItemRegistryContract } from "../typechain-types/contracts/ItemRegistry";
import type { Store as StoreContract } from "../typechain-types/contracts/Store";
import type { Ledger as LedgerContract } from "../typechain-types/contracts/Ledger";

export class DeployCommand {
  constructor(
    private readonly wallet: ethers.Signer,
    private readonly networkName: string = "custom"
  ) {}

  public async execute(
    accounts: string[], initialFeeRate = 1000, includeMockUSDC = false
  ) {
    // Synchronize provider to avoid nonce mismatch
    if (!this.wallet.provider) {
      throw new Error("Wallet is not connected to a provider.");
    }
    await this.wallet.provider.getBlockNumber();

    const deployed = new Map<string, { address: string; abi: any }>();

    const loadJson = (relPath: string) => {
      const resolved = path.resolve(__dirname, relPath);
      if (!fs.existsSync(resolved)) {
        throw new Error(`ABI/bytecode file not found: ${resolved}`);
      }
      return JSON.parse(fs.readFileSync(resolved, "utf8"));
    };

    const deployPath = path.resolve(
      __dirname,
      `../deployment.${this.networkName}.json`
    );

    const record = (name: string, address: string, abi: any) => {
      if (!name || !address || !abi) {
        throw new Error(`Invalid deployment record: ${name}`);
      }
      deployed.set(name, { address, abi });
      console.log(`${name} deployed at:`, address);
    };

    // --- Deploy MockUSDC (optional)
    if (includeMockUSDC) {
      const usdcJson = loadJson("../build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
      const MockUSDC = new ethers.ContractFactory(usdcJson.abi, usdcJson.bytecode, this.wallet);
      const usdc = await MockUSDC.deploy(accounts);
      await usdc.waitForDeployment();
      const usdcAddress = await usdc.getAddress();
      record("MockUSDC", usdcAddress, usdcJson.abi);
    }

    // --- Deploy Forwarder
    const forwarderJson = loadJson("../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
    const forwarderFactory = new ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, this.wallet);
    const forwarder = await forwarderFactory.deploy("ludex-forwarder");
    await forwarder.waitForDeployment();
    const forwarderAddress = await forwarder.getAddress();
    record("ERC2771Forwarder", forwarderAddress, forwarderJson.abi);

    // --- Deploy SellerRegistry
    const sellerRegistryJson = loadJson("../build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
    const sellerRegistryFactory = new ethers.ContractFactory(sellerRegistryJson.abi, sellerRegistryJson.bytecode, this.wallet);
    const sellerRegistryContract = await sellerRegistryFactory.deploy(forwarderAddress);
    await sellerRegistryContract.waitForDeployment();
    const sellerRegistryAddress = await sellerRegistryContract.getAddress();
    record("SellerRegistry", sellerRegistryAddress, sellerRegistryJson.abi);

    // --- Deploy ItemRegistry
    const itemRegistryJson = loadJson("../build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");
    const itemRegistryFactory = new ethers.ContractFactory(itemRegistryJson.abi, itemRegistryJson.bytecode, this.wallet);
    const itemRegistryContract = await itemRegistryFactory.deploy();
    await itemRegistryContract.waitForDeployment();
    const itemRegistryAddress = await itemRegistryContract.getAddress();
    record("ItemRegistry", itemRegistryAddress, itemRegistryJson.abi);

    // --- Deploy PriceTable
    const priceTableJson = loadJson("../build/contracts/contracts/PriceTable.sol/PriceTable.json");
    const priceTableFactory = new ethers.ContractFactory(priceTableJson.abi, priceTableJson.bytecode, this.wallet);
    const priceTableContract = await priceTableFactory.deploy(forwarderAddress, itemRegistryAddress, sellerRegistryAddress);
    await priceTableContract.waitForDeployment();
    const priceTableAddress = await priceTableContract.getAddress();
    record("PriceTable", priceTableAddress, priceTableJson.abi);

    const itemRegistryInitTX = 
      await (itemRegistryContract as unknown as ItemRegistryContract).setPriceTable(priceTableAddress);
    await itemRegistryInitTX.wait();

    // --- Deploy PaymentProcessor
    const paymentProcessorJson = loadJson("../build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
    const paymentProcessorFactory = new ethers.ContractFactory(paymentProcessorJson.abi, paymentProcessorJson.bytecode, this.wallet);
    const paymentProcessorContract = await paymentProcessorFactory.deploy(forwarderAddress, initialFeeRate, priceTableAddress);
    await paymentProcessorContract.waitForDeployment();
    const paymentProcessorAddress = await paymentProcessorContract.getAddress();
    record("PaymentProcessor", paymentProcessorAddress, paymentProcessorJson.abi);

    // --- Deploy Ledger
    const ledgerJson = loadJson("../build/contracts/contracts/Ledger.sol/Ledger.json");
    const ledgerFactory = new ethers.ContractFactory(ledgerJson.abi, ledgerJson.bytecode, this.wallet);
    const ledgerContract = await ledgerFactory.deploy(forwarderAddress);
    await ledgerContract.waitForDeployment();
    const ledgerAddress = await ledgerContract.getAddress();
    record("Ledger", ledgerAddress, ledgerJson.abi);

    // --- Deploy Store
    const storeJson = loadJson("../build/contracts/contracts/Store.sol/Store.json");
    const storeFactory = new ethers.ContractFactory(storeJson.abi, storeJson.bytecode, this.wallet);
    const storeContract = await storeFactory.deploy(forwarderAddress, priceTableAddress, ledgerAddress, paymentProcessorAddress);
    await storeContract.waitForDeployment();
    const storeAddress = await storeContract.getAddress();
    record("Store", storeAddress, storeJson.abi);

    const ledgerInitTX = 
      await (ledgerContract as unknown as LedgerContract).setStore(storeAddress);
    await ledgerInitTX.wait();

    // --- Write to deployment.<network>.json
    const obj: Record<string, any[]> = {};
    for (const [name, info] of deployed.entries()) {
      if (!obj[name]) obj[name] = [];
      obj[name].push({ ...info, timestamp: new Date().toISOString() });
    }
    fs.writeFileSync(deployPath, JSON.stringify(obj, null, 2));

    return deployed;
  }
}
