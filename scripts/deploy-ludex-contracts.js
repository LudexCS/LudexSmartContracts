import { config } from "dotenv";
import { DeployCommand } from "../dist/deploy/deploy-command.js";
import { Wallet, JsonRpcProvider } from "ethers";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const argv = process.argv;
const network = argv[2];

if (!network) {
  console.error("Error: You must provide a network name as an argument (e.g., node scripts/deploy-ludex-contracts.js sepolia)");
  process.exit(1);
}

const mnemonic = process.env.MNEMONIC;
const rpcUrlKey = `RPC_URL_${network.toUpperCase()}`;
const rpcUrl = process.env[rpcUrlKey];

if (!mnemonic) {
  console.error("Error: MNEMONIC is not defined in the .env file.");
  process.exit(1);
}

if (!rpcUrl) {
  console.error(`Error: ${rpcUrlKey} is not defined in the .env file.`);
  process.exit(1);
}

const configPath = path.resolve(__dirname, `../deploy-config/${network}.json`);
if (!fs.existsSync(configPath)) {
  console.error(`Error: deploy-config/${network}.json does not exist.`);
  process.exit(1);
}

const deployConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

async function main() {
  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = Wallet.fromPhrase(mnemonic, provider);
  const command = new DeployCommand(wallet, network);
  const deploymentMap = await command.execute(
    [wallet.address, ...(deployConfig.accounts ?? [])],
    deployConfig.initialFeeRate,
    deployConfig.includeMockUSDC ?? false
  );

  const outputPath = path.resolve(__dirname, `../deployment.${network}.json`);
  const output = {};
  for (const [name, info] of deploymentMap.entries()) {
    if (!output[name]) output[name] = [];
    output[name].push(info);
  }
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log("Deployment completed successfully.");
}

main().catch((err) => {
  console.error("Deployment failed:", err);
  process.exit(1);
});
