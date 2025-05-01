// hardhat-emulation/server.ts
import express from "express";
import { DeployCommand } from "./deployCommand";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const deployer = new DeployCommand();
  const contractMap = await deployer.execute();

  const app = express();

  app.get("/contracts", (req, res) => {
    const result = Object.fromEntries(contractMap);
    res.json(result);
  });

  app.get("/accounts", async (req, res) => {
    const accounts = await provider.listAccounts();
    res.json(accounts);
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
    console.log("Hardhat node assumed to be running at http://localhost:8545");
  });
}

main().catch((err) => {
  console.error("Server initialization failed:", err);
});
