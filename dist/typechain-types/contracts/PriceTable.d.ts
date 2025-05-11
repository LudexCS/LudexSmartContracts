import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../common";
export declare namespace PriceTable {
    type PriceInfoStruct = {
        token: AddressLike;
        tokenAmount: BigNumberish;
    };
    type PriceInfoStructOutput = [token: string, tokenAmount: bigint] & {
        token: string;
        tokenAmount: bigint;
    };
}
export interface PriceTableInterface extends Interface {
    getFunction(nameOrSignature: "addPaymentChannel" | "changeExchangeRate" | "changeItemPrice" | "getPriceInfoList" | "getPriceUsd" | "initializeItemPrice" | "isTrustedForwarder" | "itemRegistry" | "owner" | "paymentChannels" | "priceOfItemIn" | "removePaymentChannel" | "renounceOwnership" | "revenueSharing" | "sellerRegistry" | "startDiscount" | "transferOwnership" | "trustedForwarder" | "usdPrice" | "usdToToken"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DiscountStarted" | "ExchangeRateChanged" | "ItemPriceChanged" | "OwnershipTransferred" | "PaymentChannelAdded" | "PaymentChannelRemoved"): EventFragment;
    encodeFunctionData(functionFragment: "addPaymentChannel", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "changeExchangeRate", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "changeItemPrice", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getPriceInfoList", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getPriceUsd", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "initializeItemPrice", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "itemRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "paymentChannels", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "priceOfItemIn", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "removePaymentChannel", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "revenueSharing", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "sellerRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "startDiscount", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "trustedForwarder", values?: undefined): string;
    encodeFunctionData(functionFragment: "usdPrice", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "usdToToken", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "addPaymentChannel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "changeExchangeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "changeItemPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPriceInfoList", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPriceUsd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initializeItemPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "itemRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paymentChannels", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceOfItemIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removePaymentChannel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revenueSharing", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sellerRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startDiscount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usdPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usdToToken", data: BytesLike): Result;
}
export declare namespace DiscountStartedEvent {
    type InputTuple = [
        itemID: BigNumberish,
        discountedPrice: BigNumberish
    ];
    type OutputTuple = [itemID: bigint, discountedPrice: bigint];
    interface OutputObject {
        itemID: bigint;
        discountedPrice: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ExchangeRateChangedEvent {
    type InputTuple = [
        token: AddressLike,
        newUsdToToken: BigNumberish,
        prevUsdToToken: BigNumberish
    ];
    type OutputTuple = [
        token: string,
        newUsdToToken: bigint,
        prevUsdToToken: bigint
    ];
    interface OutputObject {
        token: string;
        newUsdToToken: bigint;
        prevUsdToToken: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ItemPriceChangedEvent {
    type InputTuple = [
        itemID: BigNumberish,
        newUsdPrice: BigNumberish,
        prevUsdPrice: BigNumberish
    ];
    type OutputTuple = [
        itemID: bigint,
        newUsdPrice: bigint,
        prevUsdPrice: bigint
    ];
    interface OutputObject {
        itemID: bigint;
        newUsdPrice: bigint;
        prevUsdPrice: bigint;
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
export declare namespace PaymentChannelAddedEvent {
    type InputTuple = [token: AddressLike, usdToToken_: BigNumberish];
    type OutputTuple = [token: string, usdToToken_: bigint];
    interface OutputObject {
        token: string;
        usdToToken_: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PaymentChannelRemovedEvent {
    type InputTuple = [token: AddressLike, isSuccess: boolean];
    type OutputTuple = [token: string, isSuccess: boolean];
    interface OutputObject {
        token: string;
        isSuccess: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface PriceTable extends BaseContract {
    connect(runner?: ContractRunner | null): PriceTable;
    waitForDeployment(): Promise<this>;
    interface: PriceTableInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addPaymentChannel: TypedContractMethod<[
        token: AddressLike,
        usdToToken_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    changeExchangeRate: TypedContractMethod<[
        paymentChannel: AddressLike,
        usdToToken_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    changeItemPrice: TypedContractMethod<[
        itemID: BigNumberish,
        usdPrice_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getPriceInfoList: TypedContractMethod<[
        itemID: BigNumberish
    ], [
        PriceTable.PriceInfoStructOutput[]
    ], "view">;
    getPriceUsd: TypedContractMethod<[itemID: BigNumberish], [bigint], "view">;
    initializeItemPrice: TypedContractMethod<[
        itemID: BigNumberish,
        usdPrice_: BigNumberish,
        revenueShare: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    itemRegistry: TypedContractMethod<[], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    paymentChannels: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    priceOfItemIn: TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        bigint
    ], "view">;
    removePaymentChannel: TypedContractMethod<[
        token: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    revenueSharing: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    sellerRegistry: TypedContractMethod<[], [string], "view">;
    startDiscount: TypedContractMethod<[
        itemID: BigNumberish,
        usdPrice_: BigNumberish,
        endTime: BigNumberish
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    trustedForwarder: TypedContractMethod<[], [string], "view">;
    usdPrice: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    usdToToken: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addPaymentChannel"): TypedContractMethod<[
        token: AddressLike,
        usdToToken_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "changeExchangeRate"): TypedContractMethod<[
        paymentChannel: AddressLike,
        usdToToken_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "changeItemPrice"): TypedContractMethod<[
        itemID: BigNumberish,
        usdPrice_: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getPriceInfoList"): TypedContractMethod<[
        itemID: BigNumberish
    ], [
        PriceTable.PriceInfoStructOutput[]
    ], "view">;
    getFunction(nameOrSignature: "getPriceUsd"): TypedContractMethod<[itemID: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "initializeItemPrice"): TypedContractMethod<[
        itemID: BigNumberish,
        usdPrice_: BigNumberish,
        revenueShare: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "itemRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "paymentChannels"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "priceOfItemIn"): TypedContractMethod<[
        itemID: BigNumberish,
        token: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "removePaymentChannel"): TypedContractMethod<[token: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "revenueSharing"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "sellerRegistry"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "startDiscount"): TypedContractMethod<[
        itemID: BigNumberish,
        usdPrice_: BigNumberish,
        endTime: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "trustedForwarder"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "usdPrice"): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "usdToToken"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getEvent(key: "DiscountStarted"): TypedContractEvent<DiscountStartedEvent.InputTuple, DiscountStartedEvent.OutputTuple, DiscountStartedEvent.OutputObject>;
    getEvent(key: "ExchangeRateChanged"): TypedContractEvent<ExchangeRateChangedEvent.InputTuple, ExchangeRateChangedEvent.OutputTuple, ExchangeRateChangedEvent.OutputObject>;
    getEvent(key: "ItemPriceChanged"): TypedContractEvent<ItemPriceChangedEvent.InputTuple, ItemPriceChangedEvent.OutputTuple, ItemPriceChangedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "PaymentChannelAdded"): TypedContractEvent<PaymentChannelAddedEvent.InputTuple, PaymentChannelAddedEvent.OutputTuple, PaymentChannelAddedEvent.OutputObject>;
    getEvent(key: "PaymentChannelRemoved"): TypedContractEvent<PaymentChannelRemovedEvent.InputTuple, PaymentChannelRemovedEvent.OutputTuple, PaymentChannelRemovedEvent.OutputObject>;
    filters: {
        "DiscountStarted(uint32,uint256)": TypedContractEvent<DiscountStartedEvent.InputTuple, DiscountStartedEvent.OutputTuple, DiscountStartedEvent.OutputObject>;
        DiscountStarted: TypedContractEvent<DiscountStartedEvent.InputTuple, DiscountStartedEvent.OutputTuple, DiscountStartedEvent.OutputObject>;
        "ExchangeRateChanged(address,uint256,uint256)": TypedContractEvent<ExchangeRateChangedEvent.InputTuple, ExchangeRateChangedEvent.OutputTuple, ExchangeRateChangedEvent.OutputObject>;
        ExchangeRateChanged: TypedContractEvent<ExchangeRateChangedEvent.InputTuple, ExchangeRateChangedEvent.OutputTuple, ExchangeRateChangedEvent.OutputObject>;
        "ItemPriceChanged(uint32,uint256,uint256)": TypedContractEvent<ItemPriceChangedEvent.InputTuple, ItemPriceChangedEvent.OutputTuple, ItemPriceChangedEvent.OutputObject>;
        ItemPriceChanged: TypedContractEvent<ItemPriceChangedEvent.InputTuple, ItemPriceChangedEvent.OutputTuple, ItemPriceChangedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "PaymentChannelAdded(address,uint256)": TypedContractEvent<PaymentChannelAddedEvent.InputTuple, PaymentChannelAddedEvent.OutputTuple, PaymentChannelAddedEvent.OutputObject>;
        PaymentChannelAdded: TypedContractEvent<PaymentChannelAddedEvent.InputTuple, PaymentChannelAddedEvent.OutputTuple, PaymentChannelAddedEvent.OutputObject>;
        "PaymentChannelRemoved(address,bool)": TypedContractEvent<PaymentChannelRemovedEvent.InputTuple, PaymentChannelRemovedEvent.OutputTuple, PaymentChannelRemovedEvent.OutputObject>;
        PaymentChannelRemoved: TypedContractEvent<PaymentChannelRemovedEvent.InputTuple, PaymentChannelRemovedEvent.OutputTuple, PaymentChannelRemovedEvent.OutputObject>;
    };
}
//# sourceMappingURL=PriceTable.d.ts.map