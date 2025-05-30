import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Store, StoreInterface } from "../../contracts/Store";
type StoreConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Store__factory extends ContractFactory {
    constructor(...args: StoreConstructorParams);
    getDeployTransaction(forwarderAddress: AddressLike, priceTableAddress: AddressLike, ledgerAddress: AddressLike, paymentProcessorAddress: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(forwarderAddress: AddressLike, priceTableAddress: AddressLike, ledgerAddress: AddressLike, paymentProcessorAddress: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Store & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Store__factory;
    static readonly bytecode = "0x60a06040523480156200001157600080fd5b5060405162001b4f38038062001b4f83398181016040528101906200003791906200049c565b33848082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000b05760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000a791906200051f565b60405180910390fd5b620000c1816200036e60201b60201c565b508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505050505082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663957047f66040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200022a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000250919062000581565b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370c69b096040518163ffffffff1660e01b8152600401602060405180830381865afa158015620002fe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620003249190620005f8565b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050506200062a565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620004648262000437565b9050919050565b620004768162000457565b81146200048257600080fd5b50565b60008151905062000496816200046b565b92915050565b60008060008060808587031215620004b957620004b862000432565b5b6000620004c98782880162000485565b9450506020620004dc8782880162000485565b9350506040620004ef8782880162000485565b9250506060620005028782880162000485565b91505092959194509250565b620005198162000457565b82525050565b60006020820190506200053660008301846200050e565b92915050565b6000620005498262000457565b9050919050565b6200055b816200053c565b81146200056757600080fd5b50565b6000815190506200057b8162000550565b92915050565b6000602082840312156200059a576200059962000432565b5b6000620005aa848285016200056a565b91505092915050565b6000620005c08262000457565b9050919050565b620005d281620005b3565b8114620005de57600080fd5b50565b600081519050620005f281620005c7565b92915050565b60006020828403121562000611576200061062000432565b5b60006200062184828501620005e1565b91505092915050565b60805161150962000646600039600061039501526115096000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063715018a61161008c578063957047f611610066578063957047f6146101f2578063b54dc9de14610210578063e64d597b14610240578063f2fde38b14610270576100cf565b8063715018a6146101ac5780637da0a877146101b65780638da5cb5b146101d4576100cf565b8063100f9bf8146100d457806342f6487a146100f257806356397c3514610110578063572b6c051461012e57806362ef7c071461015e57806370c69b091461018e575b600080fd5b6100dc61028c565b6040516100e99190610cb1565b60405180910390f35b6100fa6102b2565b6040516101079190610ced565b60405180910390f35b6101186102d8565b6040516101259190610d29565b60405180910390f35b61014860048036038101906101439190610d87565b6102fe565b6040516101559190610dcf565b60405180910390f35b61017860048036038101906101739190610d87565b61033d565b6040516101859190610dcf565b60405180910390f35b610196610357565b6040516101a39190610e0b565b60405180910390f35b6101b461037d565b005b6101be610391565b6040516101cb9190610e35565b60405180910390f35b6101dc6103b9565b6040516101e99190610e35565b60405180910390f35b6101fa6103e2565b6040516102079190610e71565b60405180910390f35b61022a60048036038101906102259190610ec8565b610408565b6040516102379190610f21565b60405180910390f35b61025a60048036038101906102559190610fd7565b610551565b6040516102679190610f21565b60405180910390f35b61028a60048036038101906102859190610d87565b610693565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000610308610391565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b600061035061034a610719565b83610728565b9050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61038561080a565b61038f6000610891565b565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600082600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663eebd35e6826040518263ffffffff1660e01b81526004016104669190611073565b602060405180830381865afa158015610483573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a791906110ba565b6104e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104dd90611144565b60405180910390fd5b6104f76104f1610719565b84610728565b610536576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052d906111b0565b60405180910390fd5b610548610541610719565b8585610955565b91505092915050565b600086600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663eebd35e6826040518263ffffffff1660e01b81526004016105af9190611073565b602060405180830381865afa1580156105cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f091906110ba565b61062f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062690611144565b60405180910390fd5b61064061063a610719565b88610728565b1561065e57610657610650610719565b8989610955565b9150610688565b610673610669610719565b8888888888610adc565b61068561067e610719565b8989610955565b91505b509695505050505050565b61069b61080a565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361070d5760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016107049190610e35565b60405180910390fd5b61071681610891565b50565b6000610723610b9d565b905090565b60008082905060008173ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e86600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff1660e01b815260040161078d9291906111d0565b602060405180830381865afa1580156107aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ce919061120e565b905060027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6107fd9190611299565b8110159250505092915050565b610812610719565b73ffffffffffffffffffffffffffffffffffffffff166108306103b9565b73ffffffffffffffffffffffffffffffffffffffff161461088f57610853610719565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016108869190610e35565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639d367cd18585856040518463ffffffff1660e01b81526004016109b6939291906112ca565b600060405180830381600087803b1580156109d057600080fd5b505af11580156109e4573d6000803e3d6000fd5b50505050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166306ba53eb84866040518363ffffffff1660e01b8152600401610a45929190611301565b6020604051808303816000875af1158015610a64573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a88919061120e565b9050808473ffffffffffffffffffffffffffffffffffffffff168463ffffffff167f93d5ce83d5003c50530ce3ba909117e891a291673b4c335ecbea6ab7c2f1b70360405160405180910390a49392505050565b8473ffffffffffffffffffffffffffffffffffffffff1663d505accf87600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff888888886040518863ffffffff1660e01b8152600401610b639796959493929190611348565b600060405180830381600087803b158015610b7d57600080fd5b505af1158015610b91573d6000803e3d6000fd5b50505050505050505050565b600080600036905090506000610bb1610c12565b9050610bbc336102fe565b8015610bc85750808210155b15610c02576000368284610bdc91906113b7565b908092610beb939291906113f5565b90610bf69190611474565b60601c92505050610c0f565b610c0a610c21565b925050505b90565b6000610c1c610c29565b905090565b600033905090565b60006014905090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610c77610c72610c6d84610c32565b610c52565b610c32565b9050919050565b6000610c8982610c5c565b9050919050565b6000610c9b82610c7e565b9050919050565b610cab81610c90565b82525050565b6000602082019050610cc66000830184610ca2565b92915050565b6000610cd782610c7e565b9050919050565b610ce781610ccc565b82525050565b6000602082019050610d026000830184610cde565b92915050565b6000610d1382610c7e565b9050919050565b610d2381610d08565b82525050565b6000602082019050610d3e6000830184610d1a565b92915050565b600080fd5b6000610d5482610c32565b9050919050565b610d6481610d49565b8114610d6f57600080fd5b50565b600081359050610d8181610d5b565b92915050565b600060208284031215610d9d57610d9c610d44565b5b6000610dab84828501610d72565b91505092915050565b60008115159050919050565b610dc981610db4565b82525050565b6000602082019050610de46000830184610dc0565b92915050565b6000610df582610c7e565b9050919050565b610e0581610dea565b82525050565b6000602082019050610e206000830184610dfc565b92915050565b610e2f81610d49565b82525050565b6000602082019050610e4a6000830184610e26565b92915050565b6000610e5b82610c7e565b9050919050565b610e6b81610e50565b82525050565b6000602082019050610e866000830184610e62565b92915050565b600063ffffffff82169050919050565b610ea581610e8c565b8114610eb057600080fd5b50565b600081359050610ec281610e9c565b92915050565b60008060408385031215610edf57610ede610d44565b5b6000610eed85828601610eb3565b9250506020610efe85828601610d72565b9150509250929050565b6000819050919050565b610f1b81610f08565b82525050565b6000602082019050610f366000830184610f12565b92915050565b610f4581610f08565b8114610f5057600080fd5b50565b600081359050610f6281610f3c565b92915050565b600060ff82169050919050565b610f7e81610f68565b8114610f8957600080fd5b50565b600081359050610f9b81610f75565b92915050565b6000819050919050565b610fb481610fa1565b8114610fbf57600080fd5b50565b600081359050610fd181610fab565b92915050565b60008060008060008060c08789031215610ff457610ff3610d44565b5b600061100289828a01610eb3565b965050602061101389828a01610d72565b955050604061102489828a01610f53565b945050606061103589828a01610f8c565b935050608061104689828a01610fc2565b92505060a061105789828a01610fc2565b9150509295509295509295565b61106d81610e8c565b82525050565b60006020820190506110886000830184611064565b92915050565b61109781610db4565b81146110a257600080fd5b50565b6000815190506110b48161108e565b92915050565b6000602082840312156110d0576110cf610d44565b5b60006110de848285016110a5565b91505092915050565b600082825260208201905092915050565b7f4974656d206973206e6f74206f6e2073616c6500000000000000000000000000600082015250565b600061112e6013836110e7565b9150611139826110f8565b602082019050919050565b6000602082019050818103600083015261115d81611121565b9050919050565b7f5061796d656e74206973206e6f7420616c6c6f77656400000000000000000000600082015250565b600061119a6016836110e7565b91506111a582611164565b602082019050919050565b600060208201905081810360008301526111c98161118d565b9050919050565b60006040820190506111e56000830185610e26565b6111f26020830184610e26565b9392505050565b60008151905061120881610f3c565b92915050565b60006020828403121561122457611223610d44565b5b6000611232848285016111f9565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006112a482610f08565b91506112af83610f08565b9250826112bf576112be61123b565b5b828204905092915050565b60006060820190506112df6000830186610e26565b6112ec6020830185611064565b6112f96040830184610e26565b949350505050565b60006040820190506113166000830185611064565b6113236020830184610e26565b9392505050565b61133381610f68565b82525050565b61134281610fa1565b82525050565b600060e08201905061135d600083018a610e26565b61136a6020830189610e26565b6113776040830188610f12565b6113846060830187610f12565b611391608083018661132a565b61139e60a0830185611339565b6113ab60c0830184611339565b98975050505050505050565b60006113c282610f08565b91506113cd83610f08565b92508282039050818111156113e5576113e461126a565b5b92915050565b600080fd5b600080fd5b60008085851115611409576114086113eb565b5b8386111561141a576114196113f0565b5b6001850283019150848603905094509492505050565b600082905092915050565b60007fffffffffffffffffffffffffffffffffffffffff00000000000000000000000082169050919050565b600082821b905092915050565b60006114808383611430565b8261148b813561143b565b925060148210156114cb576114c67fffffffffffffffffffffffffffffffffffffffff00000000000000000000000083601403600802611467565b831692505b50509291505056fea2646970667358221220eba93ad429bf04aa19a9ca4e56be1d23270bd1a79d6df1e50e463048e865373364736f6c63430008150033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "forwarderAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "priceTableAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "ledgerAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "paymentProcessorAddress";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "OwnableInvalidOwner";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "OwnableUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint32";
            readonly name: "itemID";
            readonly type: "uint32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "buyer";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenID";
            readonly type: "uint256";
        }];
        readonly name: "ItemPurchased";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "isTokenPermitted";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "isPermitted";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
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
        readonly name: "itemRegistry";
        readonly outputs: readonly [{
            readonly internalType: "contract ItemRegistry";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "ledger";
        readonly outputs: readonly [{
            readonly internalType: "contract Ledger";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "payment";
        readonly outputs: readonly [{
            readonly internalType: "contract PaymentProcessor";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "priceTable";
        readonly outputs: readonly [{
            readonly internalType: "contract PriceTable";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "itemID";
            readonly type: "uint32";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }];
        readonly name: "purchaseItem";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "purchaseID";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint32";
            readonly name: "itemID";
            readonly type: "uint32";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly name: "purchaseItemWithPermission";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "purchaseID";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "sellerRegistry";
        readonly outputs: readonly [{
            readonly internalType: "contract SellerRegistry";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
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
    static createInterface(): StoreInterface;
    static connect(address: string, runner?: ContractRunner | null): Store;
}
export {};
//# sourceMappingURL=Store__factory.d.ts.map