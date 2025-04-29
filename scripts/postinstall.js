const { exec } = require("child_process");
const util = require("util");
const rimraf = require("rimraf");

const execAsync = util.promisify(exec);
const rimrafAsync = util.promisify(rimraf);

async function run(command) {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
  } catch (error) {
    console.error(`Error running command "${command}":`, error.stderr || error);
    throw error;
  }
}

async function clean() {
  const paths = ["build", "artifacts", "cache", "typechain-types", "dist"];
  for (const path of paths) {
    console.log(`Cleaning ${path}...`);
    await rimrafAsync(path);
  }
}

async function main() {
  try {
    await clean();

    console.log("Compiling smart contracts (Hardhat)...");
    await run("npx hardhat compile");

    console.log("Transpiling TypeScript sources (tsc)...");
    await run("npx tsc");

    console.log("Postinstall complete.");
  } catch (err) {
    console.error("Postinstall script failed.");
    process.exit(1);
  }
}

main();
