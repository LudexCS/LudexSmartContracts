/*
import { abi as ERC721ABI } from "build/contracts/ERC721.json";
import { abi as ERC20PermitABI } from "build/contracts/ERC20Permit.json";
import { abi as ERC2771ForwarderABI } from "build/contracts/ERC2771Forwarder.json";
import { abi as StoreABI } from "build/contracts/Store.json";
import { abi as PriceTableABI } from "build/contracts/PriceTable.json";
import { abi as LedgerABI } from "build/contracts/Ledger.json";
import { abi as SellerRegistryABI } from "build/contracts/SellerRegistry.json";
import { abi as ItemRegistryABI } from "build/contracts/ItemRegistry.json";
*/

export namespace LudexContract {
    export namespace ABI {
        export const ERC721: any = 
            require("../build/contracts/ERC721.json");
        export const ERC20Permit: any = 
            require("../build/contracts/ERC20Permit.json");
        export const ERC2771Forwarder: any = 
            require("../build/contracts/ERC2771Forwarder.json");
        export const Store: any = 
            require("../build/contracts/Store.json");
        export const PriceTable: any = 
            require("../build/contracts/PriceTable.json");
        export const Ledger: any = 
            require("../build/contracts/Ledger.json");
        export const SellerRegistry: any = 
            require("../build/contracts/SellerRegistry.json");
        export const ItemRegistry: any = 
            require("../build/contracts/ItemRegistry.json");
    };
};