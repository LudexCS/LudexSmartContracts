import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { Errors, ErrorsInterface } from "../../../../@openzeppelin/contracts/utils/Errors";
type ErrorsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Errors__factory extends ContractFactory {
    constructor(...args: ErrorsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Errors & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Errors__factory;
    static readonly bytecode = "0x608060405234601d57600e6021565b603f602d823930815050603f90f35b6027565b60405190565b600080fdfe6080604052600080fdfea2646970667358221220ccb49a030ef6e0d05c58f3606655cfb3d8e5af0fe51008bb5aec81da913fd95364736f6c63430008150033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "FailedCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "FailedDeployment";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "InsufficientBalance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "MissingPrecompile";
        readonly type: "error";
    }];
    static createInterface(): ErrorsInterface;
    static connect(address: string, runner?: ContractRunner | null): Errors;
}
export {};
//# sourceMappingURL=Errors__factory.d.ts.map