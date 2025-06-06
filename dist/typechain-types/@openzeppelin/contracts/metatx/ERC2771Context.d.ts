import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface ERC2771ContextInterface extends Interface {
    getFunction(nameOrSignature: "isTrustedForwarder" | "trustedForwarder"): FunctionFragment;
    encodeFunctionData(functionFragment: "isTrustedForwarder", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "trustedForwarder", values?: undefined): string;
    decodeFunctionResult(functionFragment: "isTrustedForwarder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "trustedForwarder", data: BytesLike): Result;
}
export interface ERC2771Context extends BaseContract {
    connect(runner?: ContractRunner | null): ERC2771Context;
    waitForDeployment(): Promise<this>;
    interface: ERC2771ContextInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    isTrustedForwarder: TypedContractMethod<[
        forwarder: AddressLike
    ], [
        boolean
    ], "view">;
    trustedForwarder: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "isTrustedForwarder"): TypedContractMethod<[forwarder: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "trustedForwarder"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
//# sourceMappingURL=ERC2771Context.d.ts.map