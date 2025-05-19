import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface SellerProxyInterface extends Interface {
    getFunction(nameOrSignature: "claimProfit" | "claimSellerRight" | "getItemsOfSeller" | "owner" | "registerItem" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ItemRegistrationDelegated" | "OwnershipTransferred" | "ProfitClaimDelegated" | "SellerRightClaimed"): EventFragment;
    encodeFunctionData(functionFragment: "claimProfit", values: [BigNumberish, BigNumberish, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "claimSellerRight", values: [BigNumberish, BigNumberish[], AddressLike]): string;
    encodeFunctionData(functionFragment: "getItemsOfSeller", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "registerItem", values: [
        BytesLike,
        BigNumberish,
        BigNumberish[],
        BigNumberish,
        BigNumberish[],
        BigNumberish[]
    ]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "claimProfit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimSellerRight", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getItemsOfSeller", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
export declare namespace ItemRegistrationDelegatedEvent {
    type InputTuple = [itemID: BigNumberish, sellerID: BigNumberish];
    type OutputTuple = [itemID: bigint, sellerID: bigint];
    interface OutputObject {
        itemID: bigint;
        sellerID: bigint;
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
export declare namespace ProfitClaimDelegatedEvent {
    type InputTuple = [
        token: AddressLike,
        recipient: AddressLike,
        itemID: BigNumberish
    ];
    type OutputTuple = [token: string, recipient: string, itemID: bigint];
    interface OutputObject {
        token: string;
        recipient: string;
        itemID: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SellerRightClaimedEvent {
    type InputTuple = [
        sellerID: BigNumberish,
        sellerAddress: AddressLike,
        items: BigNumberish[]
    ];
    type OutputTuple = [
        sellerID: bigint,
        sellerAddress: string,
        items: bigint[]
    ];
    interface OutputObject {
        sellerID: bigint;
        sellerAddress: string;
        items: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface SellerProxy extends BaseContract {
    connect(runner?: ContractRunner | null): SellerProxy;
    waitForDeployment(): Promise<this>;
    interface: SellerProxyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claimProfit: TypedContractMethod<[
        sellerID: BigNumberish,
        itemID: BigNumberish,
        token: AddressLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    claimSellerRight: TypedContractMethod<[
        sellerID: BigNumberish,
        items: BigNumberish[],
        sellerAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getItemsOfSeller: TypedContractMethod<[
        sellerID: BigNumberish
    ], [
        bigint[]
    ], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    registerItem: TypedContractMethod<[
        itemNameHash: BytesLike,
        sellerID: BigNumberish,
        revenueSharers: BigNumberish[],
        usdPrice: BigNumberish,
        shareTerms: BigNumberish[],
        shares: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claimProfit"): TypedContractMethod<[
        sellerID: BigNumberish,
        itemID: BigNumberish,
        token: AddressLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimSellerRight"): TypedContractMethod<[
        sellerID: BigNumberish,
        items: BigNumberish[],
        sellerAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getItemsOfSeller"): TypedContractMethod<[sellerID: BigNumberish], [bigint[]], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "registerItem"): TypedContractMethod<[
        itemNameHash: BytesLike,
        sellerID: BigNumberish,
        revenueSharers: BigNumberish[],
        usdPrice: BigNumberish,
        shareTerms: BigNumberish[],
        shares: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "ItemRegistrationDelegated"): TypedContractEvent<ItemRegistrationDelegatedEvent.InputTuple, ItemRegistrationDelegatedEvent.OutputTuple, ItemRegistrationDelegatedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "ProfitClaimDelegated"): TypedContractEvent<ProfitClaimDelegatedEvent.InputTuple, ProfitClaimDelegatedEvent.OutputTuple, ProfitClaimDelegatedEvent.OutputObject>;
    getEvent(key: "SellerRightClaimed"): TypedContractEvent<SellerRightClaimedEvent.InputTuple, SellerRightClaimedEvent.OutputTuple, SellerRightClaimedEvent.OutputObject>;
    filters: {
        "ItemRegistrationDelegated(uint32,uint32)": TypedContractEvent<ItemRegistrationDelegatedEvent.InputTuple, ItemRegistrationDelegatedEvent.OutputTuple, ItemRegistrationDelegatedEvent.OutputObject>;
        ItemRegistrationDelegated: TypedContractEvent<ItemRegistrationDelegatedEvent.InputTuple, ItemRegistrationDelegatedEvent.OutputTuple, ItemRegistrationDelegatedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "ProfitClaimDelegated(address,address,uint32)": TypedContractEvent<ProfitClaimDelegatedEvent.InputTuple, ProfitClaimDelegatedEvent.OutputTuple, ProfitClaimDelegatedEvent.OutputObject>;
        ProfitClaimDelegated: TypedContractEvent<ProfitClaimDelegatedEvent.InputTuple, ProfitClaimDelegatedEvent.OutputTuple, ProfitClaimDelegatedEvent.OutputObject>;
        "SellerRightClaimed(uint32,address,uint32[])": TypedContractEvent<SellerRightClaimedEvent.InputTuple, SellerRightClaimedEvent.OutputTuple, SellerRightClaimedEvent.OutputObject>;
        SellerRightClaimed: TypedContractEvent<SellerRightClaimedEvent.InputTuple, SellerRightClaimedEvent.OutputTuple, SellerRightClaimedEvent.OutputObject>;
    };
}
//# sourceMappingURL=SellerProxy.d.ts.map