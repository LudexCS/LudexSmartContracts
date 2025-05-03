import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import path from "path";

const config: HardhatUserConfig = {
    solidity: "0.8.21",
    paths: {
        artifacts: path.join(__dirname, "build/contracts"),
        cache: path.join(__dirname, "build/cache"),
        sources: path.join(__dirname, "contracts"),
        tests: path.join(__dirname, "test")
    }
}

export default config;