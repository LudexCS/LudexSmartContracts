import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface ItemRegistryInterface extends Interface {
    getFunction(nameOrSignature: "getItemsOfSeller" | "itemRevenueSharers" | "nameHash" | "numberOfSharers" | "owner" | "registerItem" | "renounceOwnership" | "resumeItemSale" | "revenueSharerOfItem" | "revenueSharingItems" | "seller" | "setPriceTable" | "setSellerProxy" | "suspendItemSale" | "suspensions" | "timestampRegistered" | "transferOwnership" | "transferSellerRight"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ItemRegistered" | "ItemSaleResumed" | "ItemSaleSuspended" | "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "getItemsOfSeller", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "itemRevenueSharers", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "nameHash", values: [string]): string;
    encodeFunctionData(functionFragment: "numberOfSharers", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "registerItem", values: [
        BytesLike,
        AddressLike,
        BigNumberish[],
        BigNumberish,
        BigNumberish[],
        BigNumberish[]
    ]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "resumeItemSale", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "revenueSharerOfItem", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "revenueSharingItems", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "seller", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setPriceTable", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setSellerProxy", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "suspendItemSale", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "suspensions", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "timestampRegistered", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "transferSellerRight", values: [BigNumberish, AddressLike]): string;
    decodeFunctionResult(functionFragment: "getItemsOfSeller", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "itemRevenueSharers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nameHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "numberOfSharers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resumeItemSale", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revenueSharerOfItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revenueSharingItems", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "seller", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPriceTable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSellerProxy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "suspendItemSale", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "suspensions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "timestampRegistered", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferSellerRight", data: BytesLike): Result;
}
export declare namespace ItemRegisteredEvent {
    type InputTuple = [
        itemName: BytesLike,
        seller: AddressLike,
        itemID: BigNumberish,
        usdPrice: BigNumberish,
        shareItemIDs: BigNumberish[]
    ];
    type OutputTuple = [
        itemName: string,
        seller: string,
        itemID: bigint,
        usdPrice: bigint,
        shareItemIDs: bigint[]
    ];
    interface OutputObject {
        itemName: string;
        seller: string;
        itemID: bigint;
        usdPrice: bigint;
        shareItemIDs: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ItemSaleResumedEvent {
    type InputTuple = [itemID: BigNumberish, resumed: BigNumberish[]];
    type OutputTuple = [itemID: bigint, resumed: bigint[]];
    interface OutputObject {
        itemID: bigint;
        resumed: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ItemSaleSuspendedEvent {
    type InputTuple = [itemID: BigNumberish, suspension: BigNumberish[]];
    type OutputTuple = [itemID: bigint, suspension: bigint[]];
    interface OutputObject {
        itemID: bigint;
        suspension: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ItemRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): ItemRegistry;
    waitForDeployment(): Promise<this>;
    interface: ItemRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getItemsOfSeller: TypedContractMethod<[
        seller_: AddressLike
    ], [
        bigint[]
    ], "view">;
    itemRevenueSharers: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish
    ], [
        bigint
    ], "view">;
    nameHash: TypedContractMethod<[nameToHash: string], [string], "view">;
    numberOfSharers: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    registerItem: TypedContractMethod<[
        itemNameHash: BytesLike,
        seller_: AddressLike,
        revenueSharers: BigNumberish[],
        usdPrice: BigNumberish,
        shareTerms: BigNumberish[],
        shares: BigNumberish[]
    ], [
        [bigint, bigint[]] & {
            itemID: bigint;
            itemShareIDs: bigint[];
        }
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    resumeItemSale: TypedContractMethod<[
        itemID: BigNumberish
    ], [
        void
    ], "nonpayable">;
    revenueSharerOfItem: TypedContractMethod<[
        itemID: BigNumberish,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    revenueSharingItems: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish
    ], [
        bigint
    ], "view">;
    seller: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    setPriceTable: TypedContractMethod<[
        priceTableAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    setSellerProxy: TypedContractMethod<[
        sellerProxy_: AddressLike
    ], [
        void
    ], "nonpayable">;
    suspendItemSale: TypedContractMethod<[
        itemID: BigNumberish
    ], [
        void
    ], "nonpayable">;
    suspensions: TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
    timestampRegistered: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        bigint
    ], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferSellerRight: TypedContractMethod<[
        itemID: BigNumberish,
        newSeller: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getItemsOfSeller"): TypedContractMethod<[seller_: AddressLike], [bigint[]], "view">;
    getFunction(nameOrSignature: "itemRevenueSharers"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "nameHash"): TypedContractMethod<[nameToHash: string], [string], "view">;
    getFunction(nameOrSignature: "numberOfSharers"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "registerItem"): TypedContractMethod<[
        itemNameHash: BytesLike,
        seller_: AddressLike,
        revenueSharers: BigNumberish[],
        usdPrice: BigNumberish,
        shareTerms: BigNumberish[],
        shares: BigNumberish[]
    ], [
        [bigint, bigint[]] & {
            itemID: bigint;
            itemShareIDs: bigint[];
        }
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "resumeItemSale"): TypedContractMethod<[itemID: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "revenueSharerOfItem"): TypedContractMethod<[
        itemID: BigNumberish,
        index: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "revenueSharingItems"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "seller"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "setPriceTable"): TypedContractMethod<[
        priceTableAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setSellerProxy"): TypedContractMethod<[sellerProxy_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "suspendItemSale"): TypedContractMethod<[itemID: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "suspensions"): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
    getFunction(nameOrSignature: "timestampRegistered"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferSellerRight"): TypedContractMethod<[
        itemID: BigNumberish,
        newSeller: AddressLike
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "ItemRegistered"): TypedContractEvent<ItemRegisteredEvent.InputTuple, ItemRegisteredEvent.OutputTuple, ItemRegisteredEvent.OutputObject>;
    getEvent(key: "ItemSaleResumed"): TypedContractEvent<ItemSaleResumedEvent.InputTuple, ItemSaleResumedEvent.OutputTuple, ItemSaleResumedEvent.OutputObject>;
    getEvent(key: "ItemSaleSuspended"): TypedContractEvent<ItemSaleSuspendedEvent.InputTuple, ItemSaleSuspendedEvent.OutputTuple, ItemSaleSuspendedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "ItemRegistered(bytes32,address,uint32,uint256,uint32[])": TypedContractEvent<ItemRegisteredEvent.InputTuple, ItemRegisteredEvent.OutputTuple, ItemRegisteredEvent.OutputObject>;
        ItemRegistered: TypedContractEvent<ItemRegisteredEvent.InputTuple, ItemRegisteredEvent.OutputTuple, ItemRegisteredEvent.OutputObject>;
        "ItemSaleResumed(uint32,uint32[])": TypedContractEvent<ItemSaleResumedEvent.InputTuple, ItemSaleResumedEvent.OutputTuple, ItemSaleResumedEvent.OutputObject>;
        ItemSaleResumed: TypedContractEvent<ItemSaleResumedEvent.InputTuple, ItemSaleResumedEvent.OutputTuple, ItemSaleResumedEvent.OutputObject>;
        "ItemSaleSuspended(uint32,uint32[])": TypedContractEvent<ItemSaleSuspendedEvent.InputTuple, ItemSaleSuspendedEvent.OutputTuple, ItemSaleSuspendedEvent.OutputObject>;
        ItemSaleSuspended: TypedContractEvent<ItemSaleSuspendedEvent.InputTuple, ItemSaleSuspendedEvent.OutputTuple, ItemSaleSuspendedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
//# sourceMappingURL=ItemRegistry.d.ts.map