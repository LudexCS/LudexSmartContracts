// hardhat-emulation/deployCommand.ts
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import type { ItemRegistry as ItemRegistryContract } from "../typechain-types/contracts/ItemRegistry";
import type { Store as StoreContract } from "../typechain-types/contracts/Store";

export class DeployCommand {
  private readonly provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  }

  public async execute(accounts: string[], initialFeeRate = 1000) {
    const wallet = await this.provider.getSigner(0);
    const deployed = new Map<string, { address: string; abi: any }>();

    const loadJson = (relPath: string) => {
      return JSON.parse(fs.readFileSync(path.resolve(__dirname, relPath), "utf8"));
    };

    // --- MockUSDC 배포
    const usdcJson = loadJson("../../build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
    const MockUSDC = new ethers.ContractFactory(usdcJson.abi, usdcJson.bytecode, wallet);
    const usdc = await MockUSDC.deploy(accounts);
    await usdc.waitForDeployment();
    deployed.set("MockUSDC", {
      address: await usdc.getAddress(),
      abi: usdcJson.abi,
    });

    // --- Forwarder 배포
    const forwarderJson = loadJson("../../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
    const forwarderFactory = new ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, wallet);
    const forwarder = await forwarderFactory.deploy("ludex-forwarder");
    await forwarder.waitForDeployment();
    const forwarderAdress = await forwarder.getAddress();
    deployed.set("ERC2771Forwarder", {
      address: forwarderAdress,
      abi: forwarderJson.abi,
    });

    // --- SellerRegistry 배포
    const sellerRegistryJson = loadJson("../../build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
    const sellerRegistryFactory = new ethers.ContractFactory(sellerRegistryJson.abi, sellerRegistryJson.bytecode, wallet);
    const sellerRegistryContract = await sellerRegistryFactory.deploy(forwarderAdress);
    await sellerRegistryContract.waitForDeployment();
    const sellerRegistryAddress = await sellerRegistryContract.getAddress();
    deployed.set("SellerRegistry", {
      address: sellerRegistryAddress,
      abi: sellerRegistryJson.abi
    });
    
    // --- ItemRegistry 배포
    const itemRegistryJson = loadJson("../../build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");
    const itemRegistryFactory = new ethers.ContractFactory(itemRegistryJson.abi, itemRegistryJson.bytecode, wallet);
    const itemRegistryContract = await itemRegistryFactory.deploy();
    await itemRegistryContract.waitForDeployment();
    const itemRegistryAddress = await itemRegistryContract.getAddress();
    deployed.set("ItemRegistry", {
      address: itemRegistryAddress,
      abi: itemRegistryJson.abi
    });

    // --- PriceTable 배포
    const priceTableJson = loadJson("../../build/contracts/contracts/PriceTable.sol/PriceTable.json");
    const priceTableFactory = new ethers.ContractFactory(priceTableJson.abi, priceTableJson.bytecode, wallet);
    const priceTableContract = 
      await priceTableFactory.deploy(
        forwarderAdress,
        itemRegistryAddress,
        sellerRegistryAddress);
    await priceTableContract.waitForDeployment();
    const priceTableAddress = await priceTableContract.getAddress();
    deployed.set("PriceTable", {
      address: priceTableAddress,
      abi: priceTableJson.abi
    });

    await 
      (itemRegistryContract as unknown as ItemRegistryContract)
      .setPriceTable(priceTableAddress);

    // --- PaymentProcessor 배포
    const paymentProcessorJson = loadJson("../../build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
    const paymentProcessorFactory = new ethers.ContractFactory(paymentProcessorJson.abi, paymentProcessorJson.bytecode, wallet);
    const paymentProcessorContract =
      await paymentProcessorFactory.deploy(
        forwarderAdress,
        initialFeeRate,
        priceTableAddress);
    await paymentProcessorContract.waitForDeployment();
    const paymentProcessorAddress = await paymentProcessorContract.getAddress();

    // --- Ledger 배포
    const ledgerJson = loadJson("../../build/contracts/contracts/Ledger.sol/Ledger.json");
    const ledgerFactory = new ethers.ContractFactory(ledgerJson.abi, ledgerJson.bytecode, wallet);
    const ledgerContract = await ledgerFactory.deploy();
    await ledgerContract.waitForDeployment();
    const ledgerAddress = await ledgerContract.getAddress();
    deployed.set("Ledger", {
      address: ledgerAddress,
      abi: ledgerJson.abi
    });

    // --- Store 배포
    const storeJson = loadJson("../../build/contracts/contracts/Store.sol/Store.json");
    const storeFactory = new ethers.ContractFactory(storeJson.abi, storeJson.bytecode, wallet);
    const storeContract = 
      await storeFactory.deploy(
        forwarderAdress,
        priceTableAddress,
        ledgerAddress,
        paymentProcessorAddress);
    await storeContract.waitForDeployment();
    deployed.set("Store", {
      address: await storeContract.getAddress(),
      abi: storeJson.abi
    });
    
    return deployed;
  }
}
