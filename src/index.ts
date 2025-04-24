import { abi as ERC2771ForwarderABI } from "contracts/ERC2771Forwarder.json";
import { abi as StoreABI } from "contracts/Store.json";
import { abi as PriceTableABI } from "contracts/PriceTable.json";
import { abi as LedgerABI } from "contracts/Ledger.json";
import { abi as SellerRegistryABI } from "contracts/SellerRegistry.json";
import { abi as ItemRegistryABI } from "contracts/ItemRegistry.json";

export namespace LudexContract {
    export namespace ABI {
        export const ERC2771Forwarder: any = ERC2771ForwarderABI;
        export const Store: any = StoreABI;
        export const PriceTable: any = PriceTableABI;
        export const Ledger: any = LedgerABI;
        export const SellerRegistry: any = SellerRegistryABI;
        export const ItemRegistry: any = ItemRegistryABI;
    };
};