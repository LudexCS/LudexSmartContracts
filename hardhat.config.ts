import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.21",
    paths: {
        artifacts: path.join(__dirname, "src/build/contracts"),
        cache: path.join(__dirname, "build/cache"),
        sources: path.join(__dirname, "contracts"),
        tests: path.join(__dirname, "test")
    },
    typechain:{
        outDir: "src/typechain-types",
        target: "ethers-v6"
    },
    networks: {
        opSepolia: {
            url: "https://sepolia.optimism.io/",
            accounts: {
                mnemonic: process.env.MNEMONIC as string
            }
        }
    }
}

export default config;