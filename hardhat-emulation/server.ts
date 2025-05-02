// hardhat-emulation/server.ts
// hardhat-emulation/server.ts
import express, { Request, Response } from "express";
import { DeployCommand } from "./deployCommand";
import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const addresses: string[] = await provider.send("eth_accounts", []);

  const deployer = new DeployCommand();
  const contractMap = await deployer.execute(addresses);

  const app = express();

  app.get("/contracts", (req: Request, res: Response) => {
    const result = Object.fromEntries(contractMap);
    res.json(result);
  });

  app.get("/usdc/:address", async (req: Request, res: Response) => {
    const address = req.params.address;
    const usdcInfo = contractMap.get("MockUSDC");

    if (!usdcInfo) {
      res.status(500).json({ error: "MockUSDC not deployed" });
      return;
    }

    try {
      const usdc = new ethers.Contract(usdcInfo.address, usdcInfo.abi, provider);
      const balance = await usdc.balanceOf(address);
      res.json({ address, balance: balance.toString() });
    } catch (err) {
      res.status(400).json({
        error: "Failed to fetch balance",
        detail: err instanceof Error ? err.message : String(err),
      });
    }
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
    console.log("Hardhat RPC assumed at http://localhost:8545");
  });
}

main().catch((err) => {
  console.error("Server initialization failed:", err);
});
