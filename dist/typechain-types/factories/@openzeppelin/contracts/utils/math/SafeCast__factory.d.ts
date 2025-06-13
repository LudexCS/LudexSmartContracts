import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { SafeCast, SafeCastInterface } from "../../../../../@openzeppelin/contracts/utils/math/SafeCast";
type SafeCastConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SafeCast__factory extends ContractFactory {
    constructor(...args: SafeCastConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<SafeCast & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): SafeCast__factory;
    static readonly bytecode = "0x608060405234601d57600e6021565b603f602d823930815050603f90f35b6027565b60405190565b600080fdfe6080604052600080fdfea264697066735822122038381f9adf335679388feeb5dc5aeb8dd7957bcfec9e9a03944b280de0c562b264736f6c63430008150033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "bits";
            readonly type: "uint8";
        }, {
            readonly internalType: "int256";
            readonly name: "value";
            readonly type: "int256";
        }];
        readonly name: "SafeCastOverflowedIntDowncast";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "value";
            readonly type: "int256";
        }];
        readonly name: "SafeCastOverflowedIntToUint";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "bits";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "SafeCastOverflowedUintDowncast";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "SafeCastOverflowedUintToInt";
        readonly type: "error";
    }];
    static createInterface(): SafeCastInterface;
    static connect(address: string, runner?: ContractRunner | null): SafeCast;
}
export {};
//# sourceMappingURL=SafeCast__factory.d.ts.map