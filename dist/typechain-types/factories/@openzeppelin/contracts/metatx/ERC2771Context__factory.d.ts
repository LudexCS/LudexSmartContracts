import { type ContractRunner } from "ethers";
import type { ERC2771Context, ERC2771ContextInterface } from "../../../../@openzeppelin/contracts/metatx/ERC2771Context";
export declare class ERC2771Context__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "forwarder";
            readonly type: "address";
        }];
        readonly name: "isTrustedForwarder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "trustedForwarder";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ERC2771ContextInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC2771Context;
}
//# sourceMappingURL=ERC2771Context__factory.d.ts.map