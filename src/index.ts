// ─── ABI Import ────────────────────────────────────────────────
import { abi as ERC721ABI } from "./build/contracts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json";
import { abi as ERC20PermitABI } from "./build/contracts/@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol/ERC20Permit.json";
import { abi as ERC2771ForwarderABI } from "./build/contracts/@openzeppelin/contracts/metatx/ERC2771Forwarder.sol/ERC2771Forwarder.json";
import { abi as StoreABI } from "./build/contracts/contracts/Store.sol/Store.json";
import { abi as PriceTableABI } from "./build/contracts/contracts/PriceTable.sol/PriceTable.json";
import { abi as PaymentProcessorABI } from "./build/contracts/contracts/PaymentProcessor.sol/PaymentProcessor.json";
import { abi as LedgerABI } from "./build/contracts/contracts/Ledger.sol/Ledger.json";
import { abi as SellerRegistryABI } from "./build/contracts/contracts/SellerRegistry.sol/SellerRegistry.json";
import { abi as ItemRegistryABI } from "./build/contracts/contracts/ItemRegistry.sol/ItemRegistry.json";
import { abi as MockUSDCABI} from "./build/contracts/contracts/MockUSDC.sol/MockUSDC.json";
import { abi as ProfitEscrowABI } from "./build/contracts/contracts/ProfitEscrow.sol/ProfitEscrow.json";
import { abi as SellerProxyABI } from "./build/contracts/contracts/SellerProxy.sol/SellerProxy.json";
import { abi as PurchaseProxyABI } from "./build/contracts/contracts/PurchaseProxy.sol/PurchaseProxy.json";

// ─── Factory Import ────────────────────────────────────────────
import {
  ERC721__factory,
  ERC20Permit__factory,
  ERC2771Forwarder__factory,
  Store__factory,
  PriceTable__factory,
  PaymentProcessor__factory,
  Ledger__factory,
  SellerRegistry__factory,
  ItemRegistry__factory,
  MockUSDC__factory,
  ProfitEscrow__factory,
  SellerProxy__factory,
  PurchaseProxy__factory
} from "./typechain-types";

// ─── Type Import (with Aliases) ────────────────────────────────
import type { ERC721 as TERC721 } from "./typechain-types";
import type { ERC20Permit as TERC20Permit } from "./typechain-types";
import type { ERC2771Forwarder as TERC2771Forwarder } from "./typechain-types";
import type { Store as TStore } from "./typechain-types";
import type { PriceTable as TPriceTable } from "./typechain-types";
import type { PaymentProcessor as TPaymentProcessor } from "./typechain-types";
import type { Ledger as TLedger } from "./typechain-types";
import type { SellerRegistry as TSellerRegistry } from "./typechain-types";
import type { ItemRegistry as TItemRegistry } from "./typechain-types";
import type { MockUSDC as TMockUSDC } from "./typechain-types";
import type { ProfitEscrow as TProfitEscrow } from "./typechain-types";
import type { SellerProxy as TSellerProxy } from "./typechain-types";
import type { PurchaseProxy as TPurchaseProxy } from "./typechain-types";

// ─── Namespace Export ──────────────────────────────────────────
export namespace LudexContract {
  export namespace ABI {
    export const ERC721 = ERC721ABI;
    export const ERC20Permit = ERC20PermitABI;
    export const ERC2771Forwarder = ERC2771ForwarderABI;
    export const Store = StoreABI;
    export const PriceTable = PriceTableABI;
    export const PaymentProcessor = PaymentProcessorABI;
    export const Ledger = LedgerABI;
    export const SellerRegistry = SellerRegistryABI;
    export const ItemRegistry = ItemRegistryABI;
    export const MockUSDC = MockUSDCABI;
    export const ProfitEscrow = ProfitEscrowABI;
    export const SellerProxy = SellerProxyABI;
    export const PurchaseProxy = PurchaseProxyABI;
  }

  export namespace Factory {
    export const ERC721 = ERC721__factory;
    export const ERC20Permit = ERC20Permit__factory;
    export const ERC2771Forwarder = ERC2771Forwarder__factory;
    export const Store = Store__factory;
    export const PriceTable = PriceTable__factory;
    export const PaymentProcessor = PaymentProcessor__factory;
    export const Ledger = Ledger__factory;
    export const SellerRegistry = SellerRegistry__factory;
    export const ItemRegistry = ItemRegistry__factory;
    export const MockUSDC = MockUSDC__factory;
    export const ProfitEscrow = ProfitEscrow__factory;
    export const SellerProxy = SellerProxy__factory;
    export const PurchaseProxy = PurchaseProxy__factory;
  }

  export namespace Type {
    export type ERC721 = TERC721;
    export type ERC20Permit = TERC20Permit;
    export type ERC2771Forwarder = TERC2771Forwarder;
    export type Store = TStore;
    export type PriceTable = TPriceTable;
    export type PaymentProcessor = TPaymentProcessor;
    export type Ledger = TLedger;
    export type SellerRegistry = TSellerRegistry;
    export type ItemRegistry = TItemRegistry;
    export type MockUSDC = TMockUSDC;
    export type ProfitEscrow = TProfitEscrow;
    export type SellerProxy = TSellerProxy;
    export type PurchaseProxy = TPurchaseProxy;
  }
}
