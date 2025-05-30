import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface ProfitEscrowInterface extends Interface {
    getFunction(nameOrSignature: "accumulate" | "accumulatePendingProfit" | "claim" | "getBalanceFor" | "getPendingProfit" | "getWholePendingProfit" | "isTrustedForwarder" | "itemRegistry" | "owner" | "paymentProcessor" | "priceTable" | "renounceOwnership" | "setPaymentProcessor" | "settlePendingProfit" | "transferOwnership" | "trustedForwarder"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred" | "ProcessorUpdated" | "ProfitAccumulated" | "ProfitClaimed" | "ProfitPending" | "ProfitSettled"): EventFragment;
    encodeFunctionData(functionFragment: "accumulate", values: [BigNumberish, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "accumulatePendingProfit", values: [BigNumberish, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "claim", values: [BigNumberish, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "getBalanceFor", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getPendingProfit", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getWholePendingProfit", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "itemRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "paymentProcessor", values?: undefined): string;
    encodeFunctionData(functionFragment: "priceTable", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setPaymentProcessor", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "settlePendingProfit", values: [AddressLike, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "trustedForwarder", values?: undefined): string;
    decodeFunctionResult(functionFragment: "accumulate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accumulatePendingProfit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBalanceFor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPendingProfit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getWholePendingProfit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "itemRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paymentProcessor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceTable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPaymentProcessor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "settlePendingProfit", data: BytesLike): Result;
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
export declare namespace ProcessorUpdatedEvent {
    type InputTuple = [newProcessor: AddressLike];
    type OutputTuple = [newProcessor: string];
    interface OutputObject {
        newProcessor: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ProfitAccumulatedEvent {
    type InputTuple = [
        itemID: BigNumberish,
        token: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [itemID: bigint, token: string, amount: bigint];
    interface OutputObject {
        itemID: bigint;
        token: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ProfitClaimedEvent {
    type InputTuple = [
        itemID: BigNumberish,
        token: AddressLike,
        recipient: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [
        itemID: bigint,
        token: string,
        recipient: string,
        amount: bigint
    ];
    interface OutputObject {
        itemID: bigint;
        token: string;
        recipient: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ProfitPendingEvent {
    type InputTuple = [
        itemID: BigNumberish,
        token: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [itemID: bigint, token: string, amount: bigint];
    interface OutputObject {
        itemID: bigint;
        token: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ProfitSettledEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ProfitEscrow extends BaseContract {
    connect(runner?: ContractRunner | null): ProfitEscrow;
    waitForDeployment(): Promise<this>;
    interface: ProfitEscrowInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    accumulate: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    accumulatePendingProfit: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    claim: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getBalanceFor: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        bigint
    ], "view">;
    getPendingProfit: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        bigint
    ], "view">;
    getWholePendingProfit: TypedContractMethod<[
        token: AddressLike
    ], [
        bigint
    ], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    itemRegistry: TypedContractMethod<[], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    paymentProcessor: TypedContractMethod<[], [string], "view">;
    priceTable: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    setPaymentProcessor: TypedContractMethod<[
        processor: AddressLike
    ], [
        void
    ], "nonpayable">;
    settlePendingProfit: TypedContractMethod<[
        token: AddressLike,
        itemIDs: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    trustedForwarder: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "accumulate"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "accumulatePendingProfit"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike,
        recipient: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getBalanceFor"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getPendingProfit"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getWholePendingProfit"): TypedContractMethod<[token: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "itemRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "paymentProcessor"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "priceTable"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setPaymentProcessor"): TypedContractMethod<[processor: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "settlePendingProfit"): TypedContractMethod<[
        token: AddressLike,
        itemIDs: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "trustedForwarder"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "ProcessorUpdated"): TypedContractEvent<ProcessorUpdatedEvent.InputTuple, ProcessorUpdatedEvent.OutputTuple, ProcessorUpdatedEvent.OutputObject>;
    getEvent(key: "ProfitAccumulated"): TypedContractEvent<ProfitAccumulatedEvent.InputTuple, ProfitAccumulatedEvent.OutputTuple, ProfitAccumulatedEvent.OutputObject>;
    getEvent(key: "ProfitClaimed"): TypedContractEvent<ProfitClaimedEvent.InputTuple, ProfitClaimedEvent.OutputTuple, ProfitClaimedEvent.OutputObject>;
    getEvent(key: "ProfitPending"): TypedContractEvent<ProfitPendingEvent.InputTuple, ProfitPendingEvent.OutputTuple, ProfitPendingEvent.OutputObject>;
    getEvent(key: "ProfitSettled"): TypedContractEvent<ProfitSettledEvent.InputTuple, ProfitSettledEvent.OutputTuple, ProfitSettledEvent.OutputObject>;
    filters: {
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "ProcessorUpdated(address)": TypedContractEvent<ProcessorUpdatedEvent.InputTuple, ProcessorUpdatedEvent.OutputTuple, ProcessorUpdatedEvent.OutputObject>;
        ProcessorUpdated: TypedContractEvent<ProcessorUpdatedEvent.InputTuple, ProcessorUpdatedEvent.OutputTuple, ProcessorUpdatedEvent.OutputObject>;
        "ProfitAccumulated(uint32,address,uint256)": TypedContractEvent<ProfitAccumulatedEvent.InputTuple, ProfitAccumulatedEvent.OutputTuple, ProfitAccumulatedEvent.OutputObject>;
        ProfitAccumulated: TypedContractEvent<ProfitAccumulatedEvent.InputTuple, ProfitAccumulatedEvent.OutputTuple, ProfitAccumulatedEvent.OutputObject>;
        "ProfitClaimed(uint32,address,address,uint256)": TypedContractEvent<ProfitClaimedEvent.InputTuple, ProfitClaimedEvent.OutputTuple, ProfitClaimedEvent.OutputObject>;
        ProfitClaimed: TypedContractEvent<ProfitClaimedEvent.InputTuple, ProfitClaimedEvent.OutputTuple, ProfitClaimedEvent.OutputObject>;
        "ProfitPending(uint32,address,uint256)": TypedContractEvent<ProfitPendingEvent.InputTuple, ProfitPendingEvent.OutputTuple, ProfitPendingEvent.OutputObject>;
        ProfitPending: TypedContractEvent<ProfitPendingEvent.InputTuple, ProfitPendingEvent.OutputTuple, ProfitPendingEvent.OutputObject>;
        "ProfitSettled()": TypedContractEvent<ProfitSettledEvent.InputTuple, ProfitSettledEvent.OutputTuple, ProfitSettledEvent.OutputObject>;
        ProfitSettled: TypedContractEvent<ProfitSettledEvent.InputTuple, ProfitSettledEvent.OutputTuple, ProfitSettledEvent.OutputObject>;
    };
}
//# sourceMappingURL=ProfitEscrow.d.ts.map