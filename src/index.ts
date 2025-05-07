const ERC721Json = require("../../build/contracts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json");
const ERC20PermitJson = require("../../build/contracts/@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol/ERC20Permit.json");
const ERC2771ForwarderJson = require("../../build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json");
const StoreJson = require("../../build/contracts/contracts/Store.sol/Store.json");
const PriceTableJson = require("../../build/contracts/contracts/PriceTable.sol/PriceTable.json");
const PaymentProcessorJson = require("../../build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json");
const LedgerJson = require("../../build/contracts/contracts/Ledger.sol/Ledger.json");
const SellerRegistryJson = require("../../build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json");
const ItemRegistryJson = require("../../build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json");

export namespace LudexContract {
    export namespace ABI {
        export const ERC721 = ERC721Json.abi;
        export const ERC20Permit = ERC20PermitJson.abi;
        export const ERC2771Forwarder = ERC2771ForwarderJson.abi;
        export const Store = StoreJson.abi;
        export const PriceTable = PriceTableJson.abi;
        export const PaymentProcessor = PaymentProcessorJson.abi;
        export const Ledger = LedgerJson.abi;
        export const SellerRegistry = SellerRegistryJson.abi;
        export const ItemRegistry = ItemRegistryJson.abi;
    };
};