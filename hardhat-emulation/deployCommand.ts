// hardhat-emulation/deployCommand.ts
import type { Store as StoreContract } from "../typechain-types/contracts/Store";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";

export class DeployCommand {
  private readonly provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  }

  public async execute() {
    const signer = await this.provider.getSigner(0); 
    const deployed = new Map<string, { address: string; abi: any }>();

    // --- ERC2771Forwarder (OpenZeppelin)
    const forwarderJson = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          "../../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json"
        ),
        "utf8"
      )
    );
    const Forwarder = new ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, signer);
    const forwarder = await Forwarder.deploy("Forwarder");
    await forwarder.waitForDeployment();
    deployed.set("ERC2771Forwarder", {
      address: await forwarder.getAddress(),
      abi: forwarderJson.abi,
    });

    // --- Store
    const storeJson = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../../build/contracts/contracts/Store.sol/Store.json"),
        "utf8"
      )
    );
    const StoreFactory = new ethers.ContractFactory(storeJson.abi, storeJson.bytecode, signer);
    const storeRaw = 
      await StoreFactory.deploy(
        await forwarder.getAddress(), 
        1000); // initialFeeRate (in permyriad scale)
    await storeRaw.waitForDeployment();
    deployed.set("Store", {
      address: await storeRaw.getAddress(),
      abi: storeJson.abi,
    });
    const store = storeRaw as unknown as StoreContract;

    // --- Store 내부 컨트랙트
    const loadAbi = (name: string) =>
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, `../../build/contracts/contracts/${name}.sol/${name}.json`),
          "utf8"
        )
      ).abi;

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
