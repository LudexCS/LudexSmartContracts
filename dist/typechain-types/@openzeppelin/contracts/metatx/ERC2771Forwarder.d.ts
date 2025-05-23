import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace ERC2771Forwarder {
    type ForwardRequestDataStruct = {
        from: AddressLike;
        to: AddressLike;
        value: BigNumberish;
        gas: BigNumberish;
        deadline: BigNumberish;
        data: BytesLike;
        signature: BytesLike;
    };
    type ForwardRequestDataStructOutput = [
        from: string,
        to: string,
        value: bigint,
        gas: bigint,
        deadline: bigint,
        data: string,
        signature: string
    ] & {
        from: string;
        to: string;
        value: bigint;
        gas: bigint;
        deadline: bigint;
        data: string;
        signature: string;
    };
}
export interface ERC2771ForwarderInterface extends Interface {
    getFunction(nameOrSignature: "eip712Domain" | "execute" | "executeBatch" | "nonces" | "verify"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged" | "ExecutedForwardRequest"): EventFragment;
    encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
    encodeFunctionData(functionFragment: "execute", values: [ERC2771Forwarder.ForwardRequestDataStruct]): string;
    encodeFunctionData(functionFragment: "executeBatch", values: [ERC2771Forwarder.ForwardRequestDataStruct[], AddressLike]): string;
    encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "verify", values: [ERC2771Forwarder.ForwardRequestDataStruct]): string;
    decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}
export declare namespace EIP712DomainChangedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ExecutedForwardRequestEvent {
    type InputTuple = [
        signer: AddressLike,
        nonce: BigNumberish,
        success: boolean
    ];
    type OutputTuple = [signer: string, nonce: bigint, success: boolean];
    interface OutputObject {
        signer: string;
        nonce: bigint;
        success: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface ERC2771Forwarder extends BaseContract {
    connect(runner?: ContractRunner | null): ERC2771Forwarder;
    waitForDeployment(): Promise<this>;
    interface: ERC2771ForwarderInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    eip712Domain: TypedContractMethod<[
    ], [
        [
            string,
            string,
            string,
            bigint,
            string,
            string,
            bigint[]
        ] & {
            fields: string;
            name: string;
            version: string;
            chainId: bigint;
            verifyingContract: string;
            salt: string;
            extensions: bigint[];
        }
    ], "view">;
    execute: TypedContractMethod<[
        request: ERC2771Forwarder.ForwardRequestDataStruct
    ], [
        void
    ], "payable">;
    executeBatch: TypedContractMethod<[
        requests: ERC2771Forwarder.ForwardRequestDataStruct[],
        refundReceiver: AddressLike
    ], [
        void
    ], "payable">;
    nonces: TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    verify: TypedContractMethod<[
        request: ERC2771Forwarder.ForwardRequestDataStruct
    ], [
        boolean
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
    ], [
        [
            string,
            string,
            string,
            bigint,
            string,
            string,
            bigint[]
        ] & {
            fields: string;
            name: string;
            version: string;
            chainId: bigint;
            verifyingContract: string;
            salt: string;
            extensions: bigint[];
        }
    ], "view">;
    getFunction(nameOrSignature: "execute"): TypedContractMethod<[
        request: ERC2771Forwarder.ForwardRequestDataStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "executeBatch"): TypedContractMethod<[
        requests: ERC2771Forwarder.ForwardRequestDataStruct[],
        refundReceiver: AddressLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "nonces"): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "verify"): TypedContractMethod<[
        request: ERC2771Forwarder.ForwardRequestDataStruct
    ], [
        boolean
    ], "view">;
    getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
    getEvent(key: "ExecutedForwardRequest"): TypedContractEvent<ExecutedForwardRequestEvent.InputTuple, ExecutedForwardRequestEvent.OutputTuple, ExecutedForwardRequestEvent.OutputObject>;
    filters: {
        "EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
        EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
        "ExecutedForwardRequest(address,uint256,bool)": TypedContractEvent<ExecutedForwardRequestEvent.InputTuple, ExecutedForwardRequestEvent.OutputTuple, ExecutedForwardRequestEvent.OutputObject>;
        ExecutedForwardRequest: TypedContractEvent<ExecutedForwardRequestEvent.InputTuple, ExecutedForwardRequestEvent.OutputTuple, ExecutedForwardRequestEvent.OutputObject>;
    };
}
//# sourceMappingURL=ERC2771Forwarder.d.ts.map