/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ProfitEscrow,
  ProfitEscrowInterface,
} from "../../contracts/ProfitEscrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "itemRegistry_",
        type: "address",
      },
      {
        internalType: "address",
        name: "priceTable_",
        type: "address",
      },
      {
        internalType: "address",
        name: "forwarderAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newProcessor",
        type: "address",
      },
    ],
    name: "ProcessorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "itemID",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ProfitAccumulated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "itemID",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ProfitClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "itemID",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "accumulate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "itemID",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "itemID",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getBalanceFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "itemRegistry",
    outputs: [
      {
        internalType: "contract ItemRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paymentProcessor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceTable",
    outputs: [
      {
        internalType: "contract PriceTable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "processor",
        type: "address",
      },
    ],
    name: "setPaymentProcessor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedForwarder",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e06040523480156200001157600080fd5b506040516200163438038062001634833981810160405281019062000037919062000298565b33818082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000b05760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000a7919062000305565b60405180910390fd5b620000c1816200016a60201b60201c565b508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250505050508273ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508173ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff168152505050505062000322565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002608262000233565b9050919050565b620002728162000253565b81146200027e57600080fd5b50565b600081519050620002928162000267565b92915050565b600080600060608486031215620002b457620002b36200022e565b5b6000620002c48682870162000281565b9350506020620002d78682870162000281565b9250506040620002ea8682870162000281565b9150509250925092565b620002ff8162000253565b82525050565b60006020820190506200031c6000830184620002f4565b92915050565b60805160a05160c0516112db6200035960003960006102ba0152600081816104a0015261082b015260006107dc01526112db6000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80637da0a877116100715780637da0a877146101655780638da5cb5b14610183578063957047f6146101a1578063f1c6bdf8146101bf578063f2fde38b146101dd578063f5cb7c33146101f9576100b4565b8063088b0d75146100b9578063100f9bf8146100d557806320bc0c8f146100f3578063572b6c051461010f5780635e106fa71461013f578063715018a61461015b575b600080fd5b6100d360048036038101906100ce9190610bb2565b610229565b005b6100dd6102b8565b6040516100ea9190610c3e565b60405180910390f35b61010d60048036038101906101089190610ccb565b6102dc565b005b61012960048036038101906101249190610bb2565b610440565b6040516101369190610d39565b60405180910390f35b61015960048036038101906101549190610d54565b61047f565b005b6101636107c4565b005b61016d6107d8565b60405161017a9190610db6565b60405180910390f35b61018b610800565b6040516101989190610db6565b60405180910390f35b6101a9610829565b6040516101b69190610df2565b60405180910390f35b6101c761084d565b6040516101d49190610db6565b60405180910390f35b6101f760048036038101906101f29190610bb2565b610873565b005b610213600480360381019061020e9190610e0d565b6108f9565b6040516102209190610e5c565b60405180910390f35b610231610960565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff167f94d1eaaba297ffb0e6a23b867a3d6f936cca4ae0045709e596d461aee2e362ee60405160405180910390a250565b7f000000000000000000000000000000000000000000000000000000000000000081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661031d6109e7565b73ffffffffffffffffffffffffffffffffffffffff1614610373576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036a90610ed4565b60405180910390fd5b80600260008563ffffffff1663ffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546103df9190610f23565b925050819055508173ffffffffffffffffffffffffffffffffffffffff168363ffffffff167fa5bad89c05c4fb73eb7cb9a2196edafb96670005a21bac4f045390455b04d717836040516104339190610e5c565b60405180910390a3505050565b600061044a6107d8565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b826104886109e7565b73ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16639479df9c836040518263ffffffff1660e01b81526004016104f79190610f66565b602060405180830381865afa158015610514573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105389190610f96565b73ffffffffffffffffffffffffffffffffffffffff161461058e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105859061100f565b60405180910390fd5b6000600260008663ffffffff1663ffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111610632576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106299061107b565b60405180910390fd5b6000600260008763ffffffff1663ffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84836040518363ffffffff1660e01b81526004016106cf92919061109b565b6020604051808303816000875af11580156106ee573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061071291906110f0565b610751576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074890611169565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff168663ffffffff167fbff0385f9eb39f0d66c723731d5e5d7c09e140ba89161769e6bee4969f9b8eab846040516107b59190610e5c565b60405180910390a45050505050565b6107cc610960565b6107d660006109f6565b565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f000000000000000000000000000000000000000000000000000000000000000081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61087b610960565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036108ed5760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016108e49190610db6565b60405180910390fd5b6108f6816109f6565b50565b6000600260008463ffffffff1663ffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6109686109e7565b73ffffffffffffffffffffffffffffffffffffffff16610986610800565b73ffffffffffffffffffffffffffffffffffffffff16146109e5576109a96109e7565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016109dc9190610db6565b60405180910390fd5b565b60006109f1610aba565b905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080600036905090506000610ace610b2f565b9050610ad933610440565b8015610ae55750808210155b15610b1f576000368284610af99190611189565b908092610b08939291906111c7565b90610b139190611246565b60601c92505050610b2c565b610b27610b3e565b925050505b90565b6000610b39610b46565b905090565b600033905090565b60006014905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b7f82610b54565b9050919050565b610b8f81610b74565b8114610b9a57600080fd5b50565b600081359050610bac81610b86565b92915050565b600060208284031215610bc857610bc7610b4f565b5b6000610bd684828501610b9d565b91505092915050565b6000819050919050565b6000610c04610bff610bfa84610b54565b610bdf565b610b54565b9050919050565b6000610c1682610be9565b9050919050565b6000610c2882610c0b565b9050919050565b610c3881610c1d565b82525050565b6000602082019050610c536000830184610c2f565b92915050565b600063ffffffff82169050919050565b610c7281610c59565b8114610c7d57600080fd5b50565b600081359050610c8f81610c69565b92915050565b6000819050919050565b610ca881610c95565b8114610cb357600080fd5b50565b600081359050610cc581610c9f565b92915050565b600080600060608486031215610ce457610ce3610b4f565b5b6000610cf286828701610c80565b9350506020610d0386828701610b9d565b9250506040610d1486828701610cb6565b9150509250925092565b60008115159050919050565b610d3381610d1e565b82525050565b6000602082019050610d4e6000830184610d2a565b92915050565b600080600060608486031215610d6d57610d6c610b4f565b5b6000610d7b86828701610c80565b9350506020610d8c86828701610b9d565b9250506040610d9d86828701610b9d565b9150509250925092565b610db081610b74565b82525050565b6000602082019050610dcb6000830184610da7565b92915050565b6000610ddc82610c0b565b9050919050565b610dec81610dd1565b82525050565b6000602082019050610e076000830184610de3565b92915050565b60008060408385031215610e2457610e23610b4f565b5b6000610e3285828601610c80565b9250506020610e4385828601610b9d565b9150509250929050565b610e5681610c95565b82525050565b6000602082019050610e716000830184610e4d565b92915050565b600082825260208201905092915050565b7f4e6f7420617574686f72697a6564000000000000000000000000000000000000600082015250565b6000610ebe600e83610e77565b9150610ec982610e88565b602082019050919050565b60006020820190508181036000830152610eed81610eb1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610f2e82610c95565b9150610f3983610c95565b9250828201905080821115610f5157610f50610ef4565b5b92915050565b610f6081610c59565b82525050565b6000602082019050610f7b6000830184610f57565b92915050565b600081519050610f9081610b86565b92915050565b600060208284031215610fac57610fab610b4f565b5b6000610fba84828501610f81565b91505092915050565b7f4e6f74206974656d2073656c6c65720000000000000000000000000000000000600082015250565b6000610ff9600f83610e77565b915061100482610fc3565b602082019050919050565b6000602082019050818103600083015261102881610fec565b9050919050565b7f4e6f7468696e6720746f20636c61696d00000000000000000000000000000000600082015250565b6000611065601083610e77565b91506110708261102f565b602082019050919050565b6000602082019050818103600083015261109481611058565b9050919050565b60006040820190506110b06000830185610da7565b6110bd6020830184610e4d565b9392505050565b6110cd81610d1e565b81146110d857600080fd5b50565b6000815190506110ea816110c4565b92915050565b60006020828403121561110657611105610b4f565b5b6000611114848285016110db565b91505092915050565b7f5472616e73666572206661696c65640000000000000000000000000000000000600082015250565b6000611153600f83610e77565b915061115e8261111d565b602082019050919050565b6000602082019050818103600083015261118281611146565b9050919050565b600061119482610c95565b915061119f83610c95565b92508282039050818111156111b7576111b6610ef4565b5b92915050565b600080fd5b600080fd5b600080858511156111db576111da6111bd565b5b838611156111ec576111eb6111c2565b5b6001850283019150848603905094509492505050565b600082905092915050565b60007fffffffffffffffffffffffffffffffffffffffff00000000000000000000000082169050919050565b600082821b905092915050565b60006112528383611202565b8261125d813561120d565b9250601482101561129d576112987fffffffffffffffffffffffffffffffffffffffff00000000000000000000000083601403600802611239565b831692505b50509291505056fea264697066735822122086dcb69ddfb26e1c5b71bd1eb1c411852287e9ae2cd7ff616560d0627983f81964736f6c63430008150033";

type ProfitEscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProfitEscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProfitEscrow__factory extends ContractFactory {
  constructor(...args: ProfitEscrowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    itemRegistry_: AddressLike,
    priceTable_: AddressLike,
    forwarderAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      itemRegistry_,
      priceTable_,
      forwarderAddress,
      overrides || {}
    );
  }
  override deploy(
    itemRegistry_: AddressLike,
    priceTable_: AddressLike,
    forwarderAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      itemRegistry_,
      priceTable_,
      forwarderAddress,
      overrides || {}
    ) as Promise<
      ProfitEscrow & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ProfitEscrow__factory {
    return super.connect(runner) as ProfitEscrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProfitEscrowInterface {
    return new Interface(_abi) as ProfitEscrowInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ProfitEscrow {
    return new Contract(address, _abi, runner) as unknown as ProfitEscrow;
  }
}
