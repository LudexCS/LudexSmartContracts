//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "./OwnableERC2771Context.sol";
import "./PriceTable.sol";
import "./PaymentProcessor.sol";
import "./Ledger.sol";
import "./ItemRegistry.sol";
import "./SellerRegistry.sol";

/// @title Store
/// @author Ludex
/// @notice 
/// This contract is responsible for the generation of component contracts
/// and purchase of items in the Ludex platform.
contract Store is OwnableERC2771Context {
    
    PriceTable public priceTable;
    PaymentProcessor public payment;
    Ledger public ledger;
    ItemRegistry public itemRegistry;
    SellerRegistry public sellerRegistry;

    event ItemPurchased(
        uint32 indexed itemID,
        address indexed buyer,
        uint256 indexed tokenID);

    constructor (
        address forwarderAddress,
        address priceTableAddress,
        address ledgerAddress,
        address paymentProcessorAddress
    ) 
        OwnableERC2771Context(msg.sender, forwarderAddress)
    {
        priceTable = PriceTable(priceTableAddress);
        ledger = Ledger(ledgerAddress);
        payment = PaymentProcessor(paymentProcessorAddress);
        itemRegistry = priceTable.itemRegistry();
        sellerRegistry = priceTable.sellerRegistry();
    }

    /// @notice
    /// Make a purchase, emits ItemPurchased event
    /// @param itemID ID of item registered in the system
    /// @param token By which token the buyer pay?
    function purchaseItem (
        uint32 itemID,
        address token
    )
        external
        returns (uint256 purchaseID)
    {
        require(
            payment.isAllowedToPurchase(_msgSender(), itemID, token),
            "Payment is not allowed");

        payment.process(_msgSender(), itemID, token);
        purchaseID = ledger.logPurchase(itemID, _msgSender());

        emit ItemPurchased(itemID, _msgSender(), purchaseID);
    }

}