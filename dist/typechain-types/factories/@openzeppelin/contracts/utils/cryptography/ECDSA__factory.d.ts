import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { ECDSA, ECDSAInterface } from "../../../../../@openzeppelin/contracts/utils/cryptography/ECDSA";
type ECDSAConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ECDSA__factory extends ContractFactory {
    constructor(...args: ECDSAConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ECDSA & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): ECDSA__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212200a8dce7b461ce227158c3b30eea9bcbabe0625af9d9eb74b52c0e65fd16c552d64736f6c63430008150033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "ECDSAInvalidSignature";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "length";
            readonly type: "uint256";
        }];
        readonly name: "ECDSAInvalidSignatureLength";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly name: "ECDSAInvalidSignatureS";
        readonly type: "error";
    }];
    static createInterface(): ECDSAInterface;
    static connect(address: string, runner?: ContractRunner | null): ECDSA;
}
export {};
//# sourceMappingURL=ECDSA__factory.d.ts.map