const { execSync } = require("child_process");
const path = require("path");
const rimraf = require("rimraf");

function run(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error running command: "${command}"`);
    process.exit(1);
  }
}

function clean(dir) {
  rimraf.sync(dir);
  console.log(`Removed ${dir}`);
}

function main() {
  const root = path.resolve(__dirname, "..");
  const src = path.join(root, "src");

  console.log("Cleaning build artifacts...");
  clean(path.join(root, "build/cache"));              // Hardhat cache
  clean(path.join(src, "build/contracts"));           // ABI JSONs
  clean(path.join(src, "typechain-types"));           // TypeChain output
  clean(path.join(root, "dist"));                     // TypeScript output

  console.log("Running Hardhat compile...");
  run("npx hardhat compile");

  console.log("Running TypeScript compile...");
  run("npx tsc");

  console.log("Postinstall complete.");
}

main();
