import { abi as ERC721ABI } from "build/contracts/ERC721.json";
import { abi as ERC20PermitABI } from "build/contracts/ERC20Permit.json";
import { abi as ERC2771ForwarderABI } from "build/contracts/ERC2771Forwarder.json";
import { abi as StoreABI } from "build/contracts/Store.json";
import { abi as PriceTableABI } from "build/contracts/PriceTable.json";
import { abi as LedgerABI } from "build/contracts/Ledger.json";
import { abi as SellerRegistryABI } from "build/contracts/SellerRegistry.json";
import { abi as ItemRegistryABI } from "build/contracts/ItemRegistry.json";

export namespace LudexContract {
    export namespace ABI {
        export const ERC721: any = ERC721ABI;
        export const ERC20Permit: any = ERC20PermitABI;
        export const ERC2771Forwarder: any = ERC2771ForwarderABI;
        export const Store: any = StoreABI;
        export const PriceTable: any = PriceTableABI;
        export const Ledger: any = LedgerABI;
        export const SellerRegistry: any = SellerRegistryABI;
        export const ItemRegistry: any = ItemRegistryABI;
    };
};