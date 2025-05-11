"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LudexContract = void 0;
// ─── ABI Import ────────────────────────────────────────────────
const ERC721_json_1 = require("./build/contracts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json");
const ERC20Permit_json_1 = require("./build/contracts/@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol/ERC20Permit.json");
const ERC2771Forwarder_json_1 = require("./build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
const Store_json_1 = require("./build/contracts/contracts/Store.sol/Store.json");
const PriceTable_json_1 = require("./build/contracts/contracts/PriceTable.sol/PriceTable.json");
const PaymentProcessor_json_1 = require("./build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
const Ledger_json_1 = require("./build/contracts/contracts/Ledger.sol/Ledger.json");
const SellerRegistry_json_1 = require("./build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
const ItemRegistry_json_1 = require("./build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");
const MockUSDC_json_1 = require("./build/contracts/contracts/MockUSDC.sol/MockUSDC.json");
// ─── Factory Import ────────────────────────────────────────────
const typechain_types_1 = require("./typechain-types");
// ─── Namespace Export ──────────────────────────────────────────
var LudexContract;
(function (LudexContract) {
    let ABI;
    (function (ABI) {
        ABI.ERC721 = ERC721_json_1.abi;
        ABI.ERC20Permit = ERC20Permit_json_1.abi;
        ABI.ERC2771Forwarder = ERC2771Forwarder_json_1.abi;
        ABI.Store = Store_json_1.abi;
        ABI.PriceTable = PriceTable_json_1.abi;
        ABI.PaymentProcessor = PaymentProcessor_json_1.abi;
        ABI.Ledger = Ledger_json_1.abi;
        ABI.SellerRegistry = SellerRegistry_json_1.abi;
        ABI.ItemRegistry = ItemRegistry_json_1.abi;
        ABI.MockUSDC = MockUSDC_json_1.abi;
    })(ABI = LudexContract.ABI || (LudexContract.ABI = {}));
    let Factory;
    (function (Factory) {
        Factory.ERC721 = typechain_types_1.ERC721__factory;
        Factory.ERC20Permit = typechain_types_1.ERC20Permit__factory;
        Factory.ERC2771Forwarder = typechain_types_1.ERC2771Forwarder__factory;
        Factory.Store = typechain_types_1.Store__factory;
        Factory.PriceTable = typechain_types_1.PriceTable__factory;
        Factory.PaymentProcessor = typechain_types_1.PaymentProcessor__factory;
        Factory.Ledger = typechain_types_1.Ledger__factory;
        Factory.SellerRegistry = typechain_types_1.SellerRegistry__factory;
        Factory.ItemRegistry = typechain_types_1.ItemRegistry__factory;
        Factory.MockUSDC = typechain_types_1.MockUSDC__factory;
    })(Factory = LudexContract.Factory || (LudexContract.Factory = {}));
})(LudexContract || (exports.LudexContract = LudexContract = {}));
//# sourceMappingURL=index.js.map