const { execSync } = require("child_process");

function run(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error running command "${command}"`);
    throw error;
  }
}

async function main() {
  try {
    console.log("Running Hardhat compile...");
    run("npx hardhat compile");

    console.log("Running TypeScript compile...");
    run("npx tsc");

    console.log("Postinstall complete.");
  } catch (err) {
    console.error("Postinstall script failed.");
    process.exit(1);
  }
}

main();
