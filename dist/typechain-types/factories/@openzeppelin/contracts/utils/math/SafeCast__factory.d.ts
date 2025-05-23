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
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212201408b1375f3b40ce52410945484db013792b6aa963bd8a07a5a625e8d03258b964736f6c63430008150033";
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