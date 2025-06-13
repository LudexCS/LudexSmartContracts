import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { Strings, StringsInterface } from "../../../../@openzeppelin/contracts/utils/Strings";
type StringsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Strings__factory extends ContractFactory {
    constructor(...args: StringsConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Strings & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Strings__factory;
    static readonly bytecode = "0x608060405234601d57600e6021565b603f602d823930815050603f90f35b6027565b60405190565b600080fdfe6080604052600080fdfea26469706673582212204d7279647bdabb3869ae0631d670a701d4cb70e559a8bf38d30ca7a2bac3522364736f6c63430008150033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "length";
            readonly type: "uint256";
        }];
        readonly name: "StringsInsufficientHexLength";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "StringsInvalidAddressFormat";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "StringsInvalidChar";
        readonly type: "error";
    }];
    static createInterface(): StringsInterface;
    static connect(address: string, runner?: ContractRunner | null): Strings;
}
export {};
//# sourceMappingURL=Strings__factory.d.ts.map