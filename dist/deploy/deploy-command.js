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
const ethers_1 = require("ethers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DeployCommand {
    constructor(wallet, networkName = "custom") {
        this.wallet = wallet;
        this.networkName = networkName;
    }
    execute(accounts_1) {
        return __awaiter(this, arguments, void 0, function* (accounts, initialFeeRate = 1000, includeMockUSDC = false) {
            if (!this.wallet.provider) {
                throw new Error("Wallet is not connected to a provider.");
            }
            yield this.wallet.provider.getBlockNumber();
            const deployed = new Map();
            const loadJson = (relPath) => {
                const resolved = path_1.default.resolve(__dirname, relPath);
                if (!fs_1.default.existsSync(resolved)) {
                    throw new Error(`ABI/bytecode file not found: ${resolved}`);
                }
                return JSON.parse(fs_1.default.readFileSync(resolved, "utf8"));
            };
            const record = (name, contract, abi, txResponse) => __awaiter(this, void 0, void 0, function* () {
                if (!txResponse) {
                    throw new Error(`Missing deployment transaction for: ${name}`);
                }
                const txHash = txResponse.hash;
                const tx = yield this.wallet.provider.getTransactionReceipt(txHash);
                if (!tx) {
                    throw new Error(`Transaction receipt not found for: ${txHash}`);
                }
                const block = yield this.wallet.provider.getBlock(tx.blockNumber);
                if (!block) {
                    throw new Error(`Failed to fetch block for tx: ${txHash}`);
                }
                const timestamp = new Date(block.timestamp * 1000).toISOString();
                const address = yield contract.getAddress();
                deployed.set(name, { address, abi, timestamp });
                console.log(`${name} deployed at:`, address);
            });
            // --- Deploy MockUSDC (optional)
            let usdc;
            if (includeMockUSDC) {
                const usdcJson = loadJson("../build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
                const MockUSDC = new ethers_1.ethers.ContractFactory(usdcJson.abi, usdcJson.bytecode, this.wallet);
                usdc = yield MockUSDC.deploy(accounts);
                yield usdc.waitForDeployment();
                yield record("MockUSDC", usdc, usdcJson.abi, usdc.deploymentTransaction());
            }
            // --- Deploy Forwarder
            const forwarderJson = loadJson("../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
            const forwarderFactory = new ethers_1.ethers.ContractFactory(forwarderJson.abi, forwarderJson.bytecode, this.wallet);
            const forwarder = yield forwarderFactory.deploy("ludex-forwarder");
            yield forwarder.waitForDeployment();
            yield record("ERC2771Forwarder", forwarder, forwarderJson.abi, forwarder.deploymentTransaction());
            // --- Deploy SellerRegistry
            const sellerRegistryJson = loadJson("../build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
            const sellerRegistryFactory = new ethers_1.ethers.ContractFactory(sellerRegistryJson.abi, sellerRegistryJson.bytecode, this.wallet);
            const forwarderAddress = yield forwarder.getAddress();
            const sellerRegistry = yield sellerRegistryFactory.deploy(forwarderAddress);
            yield sellerRegistry.waitForDeployment();
            yield record("SellerRegistry", sellerRegistry, sellerRegistryJson.abi, sellerRegistry.deploymentTransaction());
            // --- Deploy ItemRegistry
            const itemRegistryJson = loadJson("../build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");
            const itemRegistryFactory = new ethers_1.ethers.ContractFactory(itemRegistryJson.abi, itemRegistryJson.bytecode, this.wallet);
            const itemRegistry = yield itemRegistryFactory.deploy();
            yield itemRegistry.waitForDeployment();
            yield record("ItemRegistry", itemRegistry, itemRegistryJson.abi, itemRegistry.deploymentTransaction());
            // --- Deploy PriceTable
            const priceTableJson = loadJson("../build/contracts/contracts/PriceTable.sol/PriceTable.json");
            const priceTableFactory = new ethers_1.ethers.ContractFactory(priceTableJson.abi, priceTableJson.bytecode, this.wallet);
            const itemRegistryAddress = yield itemRegistry.getAddress();
            const sellerRegistryAddress = yield sellerRegistry.getAddress();
            const priceTable = yield priceTableFactory.deploy(forwarderAddress, itemRegistryAddress, sellerRegistryAddress);
            yield priceTable.waitForDeployment();
            yield record("PriceTable", priceTable, priceTableJson.abi, priceTable.deploymentTransaction());
            const priceTableAddress = yield priceTable.getAddress();
            const setPriceTableTX = yield itemRegistry.setPriceTable(priceTableAddress);
            yield setPriceTableTX.wait();
            console.log("set price table completed");
            // --- Deploy ProfitEscrow
            const profitEscrowJson = loadJson("../build/contracts/contracts/ProfitEscrow.sol/ProfitEscrow.json");
            const profitEscrowFactory = new ethers_1.ethers.ContractFactory(profitEscrowJson.abi, profitEscrowJson.bytecode, this.wallet);
            const profitEscrow = yield profitEscrowFactory.deploy(itemRegistryAddress, priceTableAddress, forwarderAddress);
            yield profitEscrow.waitForDeployment();
            yield record("ProfitEscrow", profitEscrow, profitEscrowJson.abi, profitEscrow.deploymentTransaction());
            const profitEscrowAddress = yield profitEscrow.getAddress();
            // --- Deploy PaymentProcessor
            const paymentProcessorJson = loadJson("../build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
            const paymentProcessorFactory = new ethers_1.ethers.ContractFactory(paymentProcessorJson.abi, paymentProcessorJson.bytecode, this.wallet);
            const paymentProcessor = yield paymentProcessorFactory.deploy(forwarderAddress, initialFeeRate, priceTableAddress, profitEscrowAddress);
            yield paymentProcessor.waitForDeployment();
            yield record("PaymentProcessor", paymentProcessor, paymentProcessorJson.abi, paymentProcessor.deploymentTransaction());
            const paymentProcessorAddress = yield paymentProcessor.getAddress();
            const setPaymentProcessorTX = yield profitEscrow.setPaymentProcessor(paymentProcessorAddress);
            yield setPaymentProcessorTX.wait();
            // --- Deploy Ledger
            const ledgerJson = loadJson("../build/contracts/contracts/Ledger.sol/Ledger.json");
            const ledgerFactory = new ethers_1.ethers.ContractFactory(ledgerJson.abi, ledgerJson.bytecode, this.wallet);
            const ledger = yield ledgerFactory.deploy(forwarderAddress);
            yield ledger.waitForDeployment();
            yield record("Ledger", ledger, ledgerJson.abi, ledger.deploymentTransaction());
            // --- Deploy Store
            const storeJson = loadJson("../build/contracts/contracts/Store.sol/Store.json");
            const storeFactory = new ethers_1.ethers.ContractFactory(storeJson.abi, storeJson.bytecode, this.wallet);
            const ledgerAddress = yield ledger.getAddress();
            const store = yield storeFactory.deploy(forwarderAddress, priceTableAddress, ledgerAddress, paymentProcessorAddress);
            yield store.waitForDeployment();
            yield record("Store", store, storeJson.abi, store.deploymentTransaction());
            const storeAddress = yield store.getAddress();
            const setStoreTX = yield ledger.setStore(storeAddress);
            yield setStoreTX.wait();
            const sellerProxyJson = loadJson("../build/contracts/contracts/SellerProxy.sol/SellerProxy.json");
            const sellerProxyFactory = new ethers_1.ethers.ContractFactory(sellerProxyJson.abi, sellerProxyJson.bytecode, this.wallet);
            const sellerProxy = yield sellerProxyFactory.deploy(paymentProcessorAddress);
            yield sellerProxy.waitForDeployment();
            yield record("SellerProxy", sellerProxy, sellerProxyJson.abi, sellerProxy.deploymentTransaction());
            const purchaseProxyJson = loadJson("../build/contracts/contracts/PurchaseProxy.sol/PurchaseProxy.json");
            const purchaseProxyFactory = new ethers_1.ethers.ContractFactory(purchaseProxyJson.abi, purchaseProxyJson.bytecode, this.wallet);
            const purchaseProxy = yield purchaseProxyFactory.deploy(storeAddress);
            yield purchaseProxy.waitForDeployment();
            yield record("PurchaseProxy", purchaseProxy, purchaseProxyJson.abi, purchaseProxy.deploymentTransaction());
            return deployed;
        });
    }
}
exports.DeployCommand = DeployCommand;
//# sourceMappingURL=deploy-command.js.map