"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const deploy_command_1 = require("../deploy/deploy-command");
const ethers_1 = require("ethers");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const signer = yield provider.getSigner(0);
        const addresses = yield provider.send("eth_accounts", []);
        const deployer = new deploy_command_1.DeployCommand(signer, "hardhat");
        const contractMap = yield deployer.execute(addresses, 1000, true);
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.get("/contracts", (req, res) => {
            const result = Object.fromEntries(contractMap);
            res.json(result);
        });
        app.get("/usdc/:address", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const address = req.params.address;
            const usdcInfo = contractMap.get("MockUSDC");
            if (!usdcInfo) {
                res.status(500).json({ error: "MockUSDC not deployed" });
                return;
            }
            try {
                const usdc = new ethers_1.ethers.Contract(usdcInfo.address, usdcInfo.abi, provider);
                const balance = yield usdc.balanceOf(address);
                res.json({ address, balance: balance.toString() });
            }
            catch (err) {
                res.status(400).json({
                    error: "Failed to fetch balance",
                    detail: err instanceof Error ? err.message : String(err),
                });
            }
        }));
        app.get("/accounts", (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield provider.send("eth_accounts", []);
                res.json(accounts);
            }
            catch (err) {
                res.status(500).json({
                    error: "Failed to fetch accounts",
                    detail: err instanceof Error ? err.message : String(err),
                });
            }
        }));
        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
            console.log("Hardhat node assumed running at http://localhost:8545");
        });
    });
}
main().catch((err) => {
    console.error("Server initialization failed:", err);
});
//# sourceMappingURL=emulation.js.map