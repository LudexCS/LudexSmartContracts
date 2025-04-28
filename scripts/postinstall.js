// scripts/postinstall.js
const { exec } = require('child_process');

function run(command) {
  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running command "${command}"`);
        console.error(stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
}

async function main() {
  try {
    console.log('Compiling contracts...');
    await run('npx truffle compile --all');

    console.log('Compiling TypeScript...');
    await run('npx tsc');

    console.log('Postinstall complete.');
  } catch (err) {
    console.error('Postinstall script failed.');
    process.exit(1);
  }
}

main();
