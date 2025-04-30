const { execSync } = require("child_process");
const path = require("path");
const rimraf = require("rimraf");

function run(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error running command "${command}"`);
    process.exit(1);
  }
}

function clean(dir) {
  rimraf.sync(dir); // OS 호환 완전 삭제
}

function main() {
  const root = path.resolve(__dirname, "..");

  console.log("Cleaning build artifacts...");
  clean(path.join(root, "build"));
  clean(path.join(root, "artifacts"));
  clean(path.join(root, "cache"));
  clean(path.join(root, "typechain-types"));
  clean(path.join(root, "dist"));

  console.log("Running Hardhat compile...");
  run("npx hardhat compile");

  console.log("Running TypeScript compile...");
  run("npx tsc");

  console.log("Postinstall complete.");
}

main();
