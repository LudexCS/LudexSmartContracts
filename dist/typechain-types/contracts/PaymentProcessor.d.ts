import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface PaymentProcessorInterface extends Interface {
    getFunction(nameOrSignature: "changePermissionDeadline" | "feeRateLog" | "isTrustedForwarder" | "itemRegistry" | "owner" | "permissionDeadline" | "priceTable" | "process" | "processWithPending" | "profitEscrow" | "renounceOwnership" | "sellerRegistry" | "setStore" | "store" | "transferOwnership" | "trustedForwarder"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "changePermissionDeadline", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "feeRateLog", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "itemRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "permissionDeadline", values?: undefined): string;
    encodeFunctionData(functionFragment: "priceTable", values?: undefined): string;
    encodeFunctionData(functionFragment: "process", values: [AddressLike, BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "processWithPending", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "profitEscrow", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "sellerRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "setStore", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "store", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "trustedForwarder", values?: undefined): string;
    decodeFunctionResult(functionFragment: "changePermissionDeadline", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeRateLog", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "itemRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permissionDeadline", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceTable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "process", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processWithPending", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "profitEscrow", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sellerRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setStore", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "store", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trustedForwarder", data: BytesLike): Result;
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
export interface PaymentProcessor extends BaseContract {
    connect(runner?: ContractRunner | null): PaymentProcessor;
    waitForDeployment(): Promise<this>;
    interface: PaymentProcessorInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    changePermissionDeadline: TypedContractMethod<[
        newDeadline: BigNumberish
    ], [
        void
    ], "nonpayable">;
    feeRateLog: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [bigint, bigint] & {
            timestamp: bigint;
            feeRate: bigint;
        }
    ], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    itemRegistry: TypedContractMethod<[], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    permissionDeadline: TypedContractMethod<[], [bigint], "view">;
    priceTable: TypedContractMethod<[], [string], "view">;
    process: TypedContractMethod<[
        buyer: AddressLike,
        itemID: BigNumberish,
        token: AddressLike
    ], [
        void
    ], "nonpayable">;
    processWithPending: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        void
    ], "nonpayable">;
    profitEscrow: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    sellerRegistry: TypedContractMethod<[], [string], "view">;
    setStore: TypedContractMethod<[
        storeAddress: AddressLike
    ], [
        void
    ], "nonpayable">;
    store: TypedContractMethod<[], [string], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    trustedForwarder: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "changePermissionDeadline"): TypedContractMethod<[newDeadline: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "feeRateLog"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [bigint, bigint] & {
            timestamp: bigint;
            feeRate: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "itemRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "permissionDeadline"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "priceTable"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "process"): TypedContractMethod<[
        buyer: AddressLike,
        itemID: BigNumberish,
        token: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "processWithPending"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "profitEscrow"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "sellerRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "setStore"): TypedContractMethod<[storeAddress: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "store"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "trustedForwarder"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
//# sourceMappingURL=PaymentProcessor.d.ts.map