"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LudexContract = void 0;
const ERC721_json_1 = require("contracts/ERC721.json");
const ERC20Permit_json_1 = require("contracts/ERC20Permit.json");
const ERC2771Forwarder_json_1 = require("contracts/ERC2771Forwarder.json");
const Store_json_1 = require("contracts/Store.json");
const PriceTable_json_1 = require("contracts/PriceTable.json");
const Ledger_json_1 = require("contracts/Ledger.json");
const SellerRegistry_json_1 = require("contracts/SellerRegistry.json");
const ItemRegistry_json_1 = require("contracts/ItemRegistry.json");
var LudexContract;
(function (LudexContract) {
    let ABI;
    (function (ABI) {
        ABI.ERC721 = ERC721_json_1.abi;
        ABI.ERC20Permit = ERC20Permit_json_1.abi;
        ABI.ERC2771Forwarder = ERC2771Forwarder_json_1.abi;
        ABI.Store = Store_json_1.abi;
        ABI.PriceTable = PriceTable_json_1.abi;
        ABI.Ledger = Ledger_json_1.abi;
        ABI.SellerRegistry = SellerRegistry_json_1.abi;
        ABI.ItemRegistry = ItemRegistry_json_1.abi;
    })(ABI = LudexContract.ABI || (LudexContract.ABI = {}));
    ;
})(LudexContract || (exports.LudexContract = LudexContract = {}));
;
//# sourceMappingURL=index.js.map