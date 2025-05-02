// hardhat-emulation/deployCommand.ts
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import type { Store as StoreContract } from "../typechain-types/contracts/Store";

export class DeployCommand {
  private readonly provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  }

  public async execute(accounts: string[]) {
    const signer = await this.provider.getSigner(0);
    const deployed = new Map<string, { address: string; abi: any }>();

    const loadJson = (relPath: string) => {
      return JSON.parse(fs.readFileSync(path.resolve(__dirname, relPath), "utf8"));
    };

    // --- MockUSDC 배포
    const usdcJson = loadJson("../../build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
    const MockUSDC = new ethers.ContractFactory(usdcJson.abi, usdcJson.bytecode, signer);
    const usdc = await MockUSDC.deploy(accounts);
    await usdc.waitForDeployment();
    deployed.set("MockUSDC", {
      address: await usdc.getAddress(),
      abi: usdcJson.abi,
    });

    // --- Forwarder 배포
    const forwarderJson = loadJson("../../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
    const Forwarder = new ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, signer);
    const forwarder = await Forwarder.deploy("ludex-forwarder");
    await forwarder.waitForDeployment();
    deployed.set("ERC2771Forwarder", {
      address: await forwarder.getAddress(),
      abi: forwarderJson.abi,
    });

    // --- Store 배포
    const storeJson = loadJson("../../build/contracts/contracts/Store.sol/Store.json");
    const StoreFactory = new ethers.ContractFactory(storeJson.abi, storeJson.bytecode, signer);
    const storeRaw = await StoreFactory.deploy(await forwarder.getAddress(), 1000); // initialFeeRate = 10%
    await storeRaw.waitForDeployment();
    deployed.set("Store", {
      address: await storeRaw.getAddress(),
      abi: storeJson.abi,
    });

    const store = storeRaw as unknown as StoreContract;

    const loadAbi = (name: string) =>
      loadJson(`../../build/contracts/contracts/${name}.sol/${name}.json`).abi;

    deployed.set("PriceTable", {
      address: await store.priceTable(),
      abi: loadAbi("PriceTable"),
    });

    deployed.set("Ledger", {
      address: await store.ledger(),
      abi: loadAbi("Ledger"),
    });

    deployed.set("ItemRegistry", {
      address: await store.itemRegistry(),
      abi: loadAbi("ItemRegistry"),
    });

    deployed.set("SellerRegistry", {
      address: await store.sellerRegistry(),
      abi: loadAbi("SellerRegistry"),
    });

    return deployed;
  }
}
