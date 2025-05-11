import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { Address, AddressInterface } from "../../../../@openzeppelin/contracts/utils/Address";
type AddressConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Address__factory extends ContractFactory {
    constructor(...args: AddressConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Address & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Address__factory;
    static readonly bytecode = "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220b119fd63491afbed9bac3ed3b7dca16ea8133addd1bf808674874995624c795364736f6c63430008150033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "target";
            readonly type: "address";
        }];
        readonly name: "AddressEmptyCode";
        readonly type: "error";
    }];
    static createInterface(): AddressInterface;
    static connect(address: string, runner?: ContractRunner | null): Address;
}
export {};
//# sourceMappingURL=Address__factory.d.ts.map