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
exports.DeployCommand = void 0;
// hardhat-emulation/deployCommand.ts
const ethers_1 = require("ethers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DeployCommand {
    constructor() {
        this.provider = new ethers_1.ethers.JsonRpcProvider("http://127.0.0.1:8545");
    }
    execute(accounts_1) {
        return __awaiter(this, arguments, void 0, function* (accounts, initialFeeRate = 1000) {
            const wallet = yield this.provider.getSigner(0);
            const deployed = new Map();
            const loadJson = (relPath) => {
                return JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, relPath), "utf8"));
            };
            // --- MockUSDC 배포
            const usdcJson = loadJson("../build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
            const MockUSDC = new ethers_1.ethers.ContractFactory(usdcJson.abi, usdcJson.bytecode, wallet);
            const usdc = yield MockUSDC.deploy(accounts);
            yield usdc.waitForDeployment();
            deployed.set("MockUSDC", {
                address: yield usdc.getAddress(),
                abi: usdcJson.abi,
            });
            // --- Forwarder 배포
            const forwarderJson = loadJson("../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
            const forwarderFactory = new ethers_1.ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, wallet);
            const forwarder = yield forwarderFactory.deploy("ludex-forwarder");
            yield forwarder.waitForDeployment();
            const forwarderAdress = yield forwarder.getAddress();
            deployed.set("ERC2771Forwarder", {
                address: forwarderAdress,
                abi: forwarderJson.abi,
            });
            // --- SellerRegistry 배포
            const sellerRegistryJson = loadJson("../build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
            const sellerRegistryFactory = new ethers_1.ethers.ContractFactory(sellerRegistryJson.abi, sellerRegistryJson.bytecode, wallet);
            const sellerRegistryContract = yield sellerRegistryFactory.deploy(forwarderAdress);
            yield sellerRegistryContract.waitForDeployment();
            const sellerRegistryAddress = yield sellerRegistryContract.getAddress();
            deployed.set("SellerRegistry", {
                address: sellerRegistryAddress,
                abi: sellerRegistryJson.abi
            });
            // --- ItemRegistry 배포
            const itemRegistryJson = loadJson("../build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");
            const itemRegistryFactory = new ethers_1.ethers.ContractFactory(itemRegistryJson.abi, itemRegistryJson.bytecode, wallet);
            const itemRegistryContract = yield itemRegistryFactory.deploy();
            yield itemRegistryContract.waitForDeployment();
            const itemRegistryAddress = yield itemRegistryContract.getAddress();
            deployed.set("ItemRegistry", {
                address: itemRegistryAddress,
                abi: itemRegistryJson.abi
            });
            // --- PriceTable 배포
            const priceTableJson = loadJson("../build/contracts/contracts/PriceTable.sol/PriceTable.json");
            const priceTableFactory = new ethers_1.ethers.ContractFactory(priceTableJson.abi, priceTableJson.bytecode, wallet);
            const priceTableContract = yield priceTableFactory.deploy(forwarderAdress, itemRegistryAddress, sellerRegistryAddress);
            yield priceTableContract.waitForDeployment();
            const priceTableAddress = yield priceTableContract.getAddress();
            deployed.set("PriceTable", {
                address: priceTableAddress,
                abi: priceTableJson.abi
            });
            yield itemRegistryContract
                .setPriceTable(priceTableAddress);
            // --- PaymentProcessor 배포
            const paymentProcessorJson = loadJson("../build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
            const paymentProcessorFactory = new ethers_1.ethers.ContractFactory(paymentProcessorJson.abi, paymentProcessorJson.bytecode, wallet);
            const paymentProcessorContract = yield paymentProcessorFactory.deploy(forwarderAdress, initialFeeRate, priceTableAddress);
            yield paymentProcessorContract.waitForDeployment();
            const paymentProcessorAddress = yield paymentProcessorContract.getAddress();
            deployed.set("PaymentProcessor", {
                address: paymentProcessorAddress,
                abi: paymentProcessorJson.abi
            });
            // --- Ledger 배포
            const ledgerJson = loadJson("../build/contracts/contracts/Ledger.sol/Ledger.json");
            const ledgerFactory = new ethers_1.ethers.ContractFactory(ledgerJson.abi, ledgerJson.bytecode, wallet);
            const ledgerContract = yield ledgerFactory.deploy(forwarderAdress);
            yield ledgerContract.waitForDeployment();
            const ledgerAddress = yield ledgerContract.getAddress();
            deployed.set("Ledger", {
                address: ledgerAddress,
                abi: ledgerJson.abi
            });
            // --- Store 배포
            const storeJson = loadJson("../build/contracts/contracts/Store.sol/Store.json");
            const storeFactory = new ethers_1.ethers.ContractFactory(storeJson.abi, storeJson.bytecode, wallet);
            const storeContract = yield storeFactory.deploy(forwarderAdress, priceTableAddress, ledgerAddress, paymentProcessorAddress);
            yield storeContract.waitForDeployment();
            const storeAddress = yield storeContract.getAddress();
            deployed.set("Store", {
                address: storeAddress,
                abi: storeJson.abi
            });
            yield ledgerContract.setStore(storeAddress);
            return deployed;
        });
    }
}
exports.DeployCommand = DeployCommand;
//# sourceMappingURL=deployCommand.js.map