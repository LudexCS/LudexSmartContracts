import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export interface SellerRegistryInterface extends Interface {
    getFunction(nameOrSignature: "addPaymentChannels" | "isActiveSeller" | "isTrustedForwarder" | "owner" | "paymentChannels" | "registerSeller" | "removePaymentChannels" | "renounceOwnership" | "transferOwnership" | "trustedForwarder"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred" | "PaymentChannelsAdded" | "PaymentChannelsRemoved" | "SellerRegistered"): EventFragment;
    encodeFunctionData(functionFragment: "addPaymentChannels", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "isActiveSeller", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "paymentChannels", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "registerSeller", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "removePaymentChannels", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "trustedForwarder", values?: undefined): string;
    decodeFunctionResult(functionFragment: "addPaymentChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isActiveSeller", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paymentChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerSeller", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removePaymentChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
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
export declare namespace PaymentChannelsAddedEvent {
    type InputTuple = [
        seller: AddressLike,
        paymentChannels: AddressLike[]
    ];
    type OutputTuple = [seller: string, paymentChannels: string[]];
    interface OutputObject {
        seller: string;
        paymentChannels: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PaymentChannelsRemovedEvent {
    type InputTuple = [
        seller: AddressLike,
        paymentChannels: AddressLike[]
    ];
    type OutputTuple = [seller: string, paymentChannels: string[]];
    interface OutputObject {
        seller: string;
        paymentChannels: string[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SellerRegisteredEvent {
    type InputTuple = [
        seller: AddressLike,
        paymentChannels: AddressLike[],
        isSuccess: boolean
    ];
    type OutputTuple = [
        seller: string,
        paymentChannels: string[],
        isSuccess: boolean
    ];
    interface OutputObject {
        seller: string;
        paymentChannels: string[];
        isSuccess: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface SellerRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): SellerRegistry;
    waitForDeployment(): Promise<this>;
    interface: SellerRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addPaymentChannels: TypedContractMethod<[
        paymentChannels_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    isActiveSeller: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    paymentChannels: TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        boolean
    ], "view">;
    registerSeller: TypedContractMethod<[
        paymentChannels_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    removePaymentChannels: TypedContractMethod<[
        paymentChannels_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    trustedForwarder: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addPaymentChannels"): TypedContractMethod<[
        paymentChannels_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isActiveSeller"): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "paymentChannels"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "registerSeller"): TypedContractMethod<[
        paymentChannels_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "removePaymentChannels"): TypedContractMethod<[
        paymentChannels_: AddressLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "trustedForwarder"): TypedContractMethod<[], [string], "view">;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "PaymentChannelsAdded"): TypedContractEvent<PaymentChannelsAddedEvent.InputTuple, PaymentChannelsAddedEvent.OutputTuple, PaymentChannelsAddedEvent.OutputObject>;
    getEvent(key: "PaymentChannelsRemoved"): TypedContractEvent<PaymentChannelsRemovedEvent.InputTuple, PaymentChannelsRemovedEvent.OutputTuple, PaymentChannelsRemovedEvent.OutputObject>;
    getEvent(key: "SellerRegistered"): TypedContractEvent<SellerRegisteredEvent.InputTuple, SellerRegisteredEvent.OutputTuple, SellerRegisteredEvent.OutputObject>;
    filters: {
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "PaymentChannelsAdded(address,address[])": TypedContractEvent<PaymentChannelsAddedEvent.InputTuple, PaymentChannelsAddedEvent.OutputTuple, PaymentChannelsAddedEvent.OutputObject>;
        PaymentChannelsAdded: TypedContractEvent<PaymentChannelsAddedEvent.InputTuple, PaymentChannelsAddedEvent.OutputTuple, PaymentChannelsAddedEvent.OutputObject>;
        "PaymentChannelsRemoved(address,address[])": TypedContractEvent<PaymentChannelsRemovedEvent.InputTuple, PaymentChannelsRemovedEvent.OutputTuple, PaymentChannelsRemovedEvent.OutputObject>;
        PaymentChannelsRemoved: TypedContractEvent<PaymentChannelsRemovedEvent.InputTuple, PaymentChannelsRemovedEvent.OutputTuple, PaymentChannelsRemovedEvent.OutputObject>;
        "SellerRegistered(address,address[],bool)": TypedContractEvent<SellerRegisteredEvent.InputTuple, SellerRegisteredEvent.OutputTuple, SellerRegisteredEvent.OutputObject>;
        SellerRegistered: TypedContractEvent<SellerRegisteredEvent.InputTuple, SellerRegisteredEvent.OutputTuple, SellerRegisteredEvent.OutputObject>;
    };
}
//# sourceMappingURL=SellerRegistry.d.ts.map