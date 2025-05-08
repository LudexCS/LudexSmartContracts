const { spawn } = require("child_process");
const { ethers } = require("ethers");

const HARDHAT_RPC_URL = "http://127.0.0.1:8545";
const HARDHAT_MNEMONIC = "test test test test test test test test test test test ludex";

function waitForRpcReady(url, timeoutMs = 60000) {
  const provider = new ethers.JsonRpcProvider(url);
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        await provider.getBlockNumber();
        return resolve();
      } catch {
        if (Date.now() - start > timeoutMs) {
          return reject(new Error("Hardhat RPC did not become ready in time."));
        }
        setTimeout(check, 500);
      }
    };
    check();
  });
}

async function main() {
  console.log("[+] Starting Hardhat node...");

  const node = spawn(
    "npx",
    ["hardhat", "node", "--hostname", "127.0.0.1", "--port", "8545"],
    {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        HARDHAT_NETWORK_MNEMONIC: HARDHAT_MNEMONIC
      }
    }
  );

  process.on("exit", () => node.kill());
  process.on("SIGINT", () => {
    node.kill();
    process.exit(0);
  });

  try {
    await waitForRpcReady(HARDHAT_RPC_URL);
  } catch (err) {
    console.error("Hardhat node did not start in time.");
    node.kill();
    process.exit(1);
  }

  console.log("[+] Starting server...");
  const server = spawn("node", ["dist/hardhat-emulation/emulation.js"], {
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
