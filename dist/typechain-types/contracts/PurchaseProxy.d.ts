import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export declare namespace PurchaseProxy {
    type PurchaseInfoStruct = {
        tokenID: BigNumberish;
        itemID: BigNumberish;
        buyer: BigNumberish;
        timestamp: BigNumberish;
    };
    type PurchaseInfoStructOutput = [
        tokenID: bigint,
        itemID: bigint,
        buyer: bigint,
        timestamp: bigint
    ] & {
        tokenID: bigint;
        itemID: bigint;
        buyer: bigint;
        timestamp: bigint;
    };
}
export interface PurchaseProxyInterface extends Interface {
    getFunction(nameOrSignature: "claimPurchaseIDs" | "getPurchaseInfo" | "owner()" | "owner(uint256)" | "purchaseItem" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred" | "PurchaseIDsClaimed"): EventFragment;
    encodeFunctionData(functionFragment: "claimPurchaseIDs", values: [BigNumberish, AddressLike, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "getPurchaseInfo", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner()", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner(uint256)", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "purchaseItem", values: [AddressLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "claimPurchaseIDs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPurchaseInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner()", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner(uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "purchaseItem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
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
export declare namespace PurchaseIDsClaimedEvent {
    type InputTuple = [owner: AddressLike, purchases: BigNumberish[]];
    type OutputTuple = [owner: string, purchases: bigint[]];
    interface OutputObject {
        owner: string;
        purchases: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface PurchaseProxy extends BaseContract {
    connect(runner?: ContractRunner | null): PurchaseProxy;
    waitForDeployment(): Promise<this>;
    interface: PurchaseProxyInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claimPurchaseIDs: TypedContractMethod<[
        ownerID: BigNumberish,
        claimer: AddressLike,
        purchaseIDs: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    getPurchaseInfo: TypedContractMethod<[
        purchaseID: BigNumberish
    ], [
        PurchaseProxy.PurchaseInfoStructOutput
    ], "view">;
    "owner()": TypedContractMethod<[], [string], "view">;
    "owner(uint256)": TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    purchaseItem: TypedContractMethod<[
        token: AddressLike,
        itemID: BigNumberish,
        ownerID: BigNumberish
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
    getFunction(nameOrSignature: "claimPurchaseIDs"): TypedContractMethod<[
        ownerID: BigNumberish,
        claimer: AddressLike,
        purchaseIDs: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getPurchaseInfo"): TypedContractMethod<[
        purchaseID: BigNumberish
    ], [
        PurchaseProxy.PurchaseInfoStructOutput
    ], "view">;
    getFunction(nameOrSignature: "owner()"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner(uint256)"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "purchaseItem"): TypedContractMethod<[
        token: AddressLike,
        itemID: BigNumberish,
        ownerID: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "PurchaseIDsClaimed"): TypedContractEvent<PurchaseIDsClaimedEvent.InputTuple, PurchaseIDsClaimedEvent.OutputTuple, PurchaseIDsClaimedEvent.OutputObject>;
    filters: {
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "PurchaseIDsClaimed(address,uint256[])": TypedContractEvent<PurchaseIDsClaimedEvent.InputTuple, PurchaseIDsClaimedEvent.OutputTuple, PurchaseIDsClaimedEvent.OutputObject>;
        PurchaseIDsClaimed: TypedContractEvent<PurchaseIDsClaimedEvent.InputTuple, PurchaseIDsClaimedEvent.OutputTuple, PurchaseIDsClaimedEvent.OutputObject>;
    };
}
//# sourceMappingURL=PurchaseProxy.d.ts.map