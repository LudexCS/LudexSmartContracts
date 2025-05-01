const { spawn } = require("child_process");
const { ethers } = require("ethers");

async function waitForRpcReady(url, timeoutMs = 10000) {
  const provider = new ethers.JsonRpcProvider(url);
  const start = Date.now();

  while (true) {
    try {
      await provider.getBlockNumber();
      return;
    } catch {
      if (Date.now() - start > timeoutMs) {
        throw new Error(`RPC at ${url} did not become ready within ${timeoutMs}ms`);
      }
      await new Promise((res) => setTimeout(res, 500));
    }
  }
}

async function main() {
  console.log("Starting Hardhat node...");

  const node = spawn("npx", ["hardhat", "node"], {
    stdio: "inherit",
    shell: true
  });

  process.on("exit", () => node.kill());
  process.on("SIGINT", () => {
    node.kill();
    process.exit(0);
  });

  try {
    await waitForRpcReady("http://127.0.0.1:8545");
  } catch (err) {
    console.error("Hardhat node did not start in time.");
    node.kill();
    process.exit(1);
  }

  console.log("Starting server...");
  const server = spawn("node", ["dist/hardhat-emulation/server.js"], {
    stdio: "inherit",
    shell: true
  });

  process.on("exit", () => server.kill());
  process.on("SIGINT", () => {
    server.kill();
    process.exit(0);
  });
}

main();
