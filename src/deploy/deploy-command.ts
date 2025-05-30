import { ethers, Contract } from "ethers";
import fs from "fs";
import path from "path";
import type { ItemRegistry as ItemRegistryContract } from "../typechain-types/contracts/ItemRegistry";
import type { Store as StoreContract } from "../typechain-types/contracts/Store";
import type { Ledger as LedgerContract } from "../typechain-types/contracts/Ledger";
import type { ProfitEscrow as ProfitEscrowContract } from "../typechain-types/contracts/ProfitEscrow";
import { PaymentProcessor as PaymentProcessorContract } from "src/typechain-types";

export class DeployCommand {
  constructor(
    private readonly wallet: ethers.Signer,
    private readonly networkName: string = "custom"
  ) {}

  public async execute(
    accounts: string[], initialFeeRate = 1000, includeMockUSDC = false
  ): Promise<Map<string, { address: string; abi: any; timestamp: string }>> {
    if (!this.wallet.provider) {
      throw new Error("Wallet is not connected to a provider.");
    }
    await this.wallet.provider.getBlockNumber();

    const deployed = new Map<string, { address: string; abi: any; timestamp: string }>();

    const loadJson = (relPath: string) => {
      const resolved = path.resolve(__dirname, relPath);
      if (!fs.existsSync(resolved)) {
        throw new Error(`ABI/bytecode file not found: ${resolved}`);
      }
      return JSON.parse(fs.readFileSync(resolved, "utf8"));
    };

    const record = async (
      name: string,
      contract: Contract,
      abi: any,
      txResponse: ethers.ContractTransactionResponse | null
    ) => {
      if (!txResponse) {
        throw new Error(`Missing deployment transaction for: ${name}`);
      }

      const txHash = txResponse.hash;

      const tx = await this.wallet.provider!.getTransactionReceipt(txHash);
      if (!tx) {
        throw new Error(`Transaction receipt not found for: ${txHash}`);
      }

      const block = await this.wallet.provider!.getBlock(tx.blockNumber);
      if (!block) {
        throw new Error(`Failed to fetch block for tx: ${txHash}`);
      }

      const timestamp = new Date(block.timestamp * 1000).toISOString();
      const address = await contract.getAddress();

      deployed.set(name, { address, abi, timestamp });
      console.log(`${name} deployed at:`, address);
    };

    // --- Deploy MockUSDC (optional)
    if (includeMockUSDC) 
    {
      const usdcJson = loadJson("../build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
      const MockUSDC = new ethers.ContractFactory(usdcJson.abi, usdcJson.bytecode, this.wallet);
      const usdc = await MockUSDC.deploy(accounts);
      await usdc.waitForDeployment();
      await record("MockUSDC", usdc as Contract, usdcJson.abi, usdc.deploymentTransaction());
    }
    // --- Deploy Forwarder
    const forwarderJson = loadJson("../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
    const forwarderFactory = new ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, this.wallet);
    const forwarder = await forwarderFactory.deploy("ludex-forwarder");
    await forwarder.waitForDeployment();
    await record("ERC2771Forwarder", forwarder as Contract, forwarderJson.abi, forwarder.deploymentTransaction());

    // --- Deploy SellerRegistry
    const sellerRegistryJson = loadJson("../build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
    const sellerRegistryFactory = new ethers.ContractFactory(sellerRegistryJson.abi, sellerRegistryJson.bytecode, this.wallet);
    const forwarderAddress = await forwarder.getAddress();
    const sellerRegistry = await sellerRegistryFactory.deploy(forwarderAddress);
    await sellerRegistry.waitForDeployment();
    await record("SellerRegistry", sellerRegistry as Contract, sellerRegistryJson.abi, sellerRegistry.deploymentTransaction());

    // --- Deploy ItemRegistry
    const itemRegistryJson = loadJson("../build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");
    const itemRegistryFactory = new ethers.ContractFactory(itemRegistryJson.abi, itemRegistryJson.bytecode, this.wallet);
    const itemRegistry = await itemRegistryFactory.deploy();
    await itemRegistry.waitForDeployment();
    await record("ItemRegistry", itemRegistry as Contract, itemRegistryJson.abi, itemRegistry.deploymentTransaction());

    // --- Deploy PriceTable
    const priceTableJson = loadJson("../build/contracts/contracts/PriceTable.sol/PriceTable.json");
    const priceTableFactory = new ethers.ContractFactory(priceTableJson.abi, priceTableJson.bytecode, this.wallet);
    const itemRegistryAddress = await itemRegistry.getAddress();
    const sellerRegistryAddress = await sellerRegistry.getAddress();
    const priceTable = await priceTableFactory.deploy(forwarderAddress, itemRegistryAddress, sellerRegistryAddress);
    await priceTable.waitForDeployment();
    await record("PriceTable", priceTable as Contract, priceTableJson.abi, priceTable.deploymentTransaction());

    const priceTableAddress = await priceTable.getAddress();
    const setPriceTableTX = await (itemRegistry as ItemRegistryContract).setPriceTable(priceTableAddress);
    await setPriceTableTX.wait();

    // --- Deploy ProfitEscrow
    const profitEscrowJson = loadJson("../build/contracts/contracts/ProfitEscrow.sol/ProfitEscrow.json");
    const profitEscrowFactory = new ethers.ContractFactory(profitEscrowJson.abi, profitEscrowJson.bytecode, this.wallet);
    const profitEscrow = await profitEscrowFactory.deploy(itemRegistryAddress, priceTableAddress, forwarderAddress);
    await profitEscrow.waitForDeployment();
    await record("ProfitEscrow", profitEscrow as Contract, profitEscrowJson.abi, profitEscrow.deploymentTransaction());

    const profitEscrowAddress = await profitEscrow.getAddress();

    // --- Deploy PaymentProcessor
    const paymentProcessorJson = loadJson("../build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
    const paymentProcessorFactory = new ethers.ContractFactory(paymentProcessorJson.abi, paymentProcessorJson.bytecode, this.wallet);
    const paymentProcessor = await paymentProcessorFactory.deploy(forwarderAddress, initialFeeRate, priceTableAddress, profitEscrowAddress);
    await paymentProcessor.waitForDeployment();
    await record("PaymentProcessor", paymentProcessor as Contract, paymentProcessorJson.abi, paymentProcessor.deploymentTransaction());
    const paymentProcessorAddress = await paymentProcessor.getAddress();

    const setPaymentProcessorTX = await (profitEscrow as ProfitEscrowContract).setPaymentProcessor(paymentProcessorAddress);
    await setPaymentProcessorTX.wait();

    // --- Deploy Ledger
    const ledgerJson = loadJson("../build/contracts/contracts/Ledger.sol/Ledger.json");
    const ledgerFactory = new ethers.ContractFactory(ledgerJson.abi, ledgerJson.bytecode, this.wallet);
    const ledger = await ledgerFactory.deploy(forwarderAddress);
    await ledger.waitForDeployment();
    await record("Ledger", ledger as Contract, ledgerJson.abi, ledger.deploymentTransaction());

    // --- Deploy Store
    const storeJson = loadJson("../build/contracts/contracts/Store.sol/Store.json");
    const storeFactory = new ethers.ContractFactory(storeJson.abi, storeJson.bytecode, this.wallet);
    const ledgerAddress = await ledger.getAddress();
    const store = await storeFactory.deploy(forwarderAddress, priceTableAddress, ledgerAddress, paymentProcessorAddress);
    await store.waitForDeployment();
    await record("Store", store as Contract, storeJson.abi, store.deploymentTransaction());

    const storeAddress = await store.getAddress();
    const setStoreTXLedger = 
      await (ledger as LedgerContract).setStore(storeAddress);
    await setStoreTXLedger.wait();

    const setStoreTXPaymentProcessor = 
      await (paymentProcessor as PaymentProcessorContract).setStore(storeAddress);
    await setPaymentProcessorTX.wait();

    const sellerProxyJson = loadJson("../build/contracts/contracts/SellerProxy.sol/SellerProxy.json");
    const sellerProxyFactory = new ethers.ContractFactory(sellerProxyJson.abi, sellerProxyJson.bytecode, this.wallet);
    const sellerProxy = await sellerProxyFactory.deploy(paymentProcessorAddress);
    await sellerProxy.waitForDeployment();
    await record("SellerProxy", sellerProxy as Contract, sellerProxyJson.abi, sellerProxy.deploymentTransaction());

    const sellerProxyAddress = sellerProxy.getAddress();
    const setSellerProxyTX = await (itemRegistry as ItemRegistryContract).setSellerProxy(sellerProxyAddress);
    await setSellerProxyTX.wait();

    const purchaseProxyJson = loadJson("../build/contracts/contracts/PurchaseProxy.sol/PurchaseProxy.json");
    const purchaseProxyFactory = new ethers.ContractFactory(purchaseProxyJson.abi, purchaseProxyJson.bytecode, this.wallet);
    const purchaseProxy = await purchaseProxyFactory.deploy(storeAddress);
    await purchaseProxy.waitForDeployment();
    await record("PurchaseProxy", purchaseProxy as Contract, purchaseProxyJson.abi, purchaseProxy.deploymentTransaction());
    
    const purchaseProxyAddress = await purchaseProxy.getAddress();
    const setPurchaseProxyTX = 
      await (store as StoreContract).setPurchaseProxy(purchaseProxyAddress);
    await setPurchaseProxyTX.wait();

    return deployed;
  }
}
