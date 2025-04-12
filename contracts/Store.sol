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
    
    PriceTable priceTable;
    PaymentProcessor payment;
    Ledger ledger;
    ItemRegistry itemRegistry;
    SellerRegistry sellerRegistry;

    constructor (
        address forwarderAddress,
        uint16 initialFeeRate
    ) 
        OwnableERC2771Context(msg.sender, forwarderAddress)
    {
        priceTable = new PriceTable(msg.sender, forwarderAddress, address(this));
        ledger = new Ledger(address(this));
        payment = 
            new PaymentProcessor(
                msg.sender,
                forwarderAddress, 
                initialFeeRate, 
                priceTable);
        itemRegistry = priceTable.itemRegistry();
        sellerRegistry = priceTable.sellerRegistry();
    }

    /// @param itemID ID of item registered in the system
    /// @param token By which token the buyer pay?
    /// @param v Signature component v used for ERC20Permit
    /// @param r Signature component r used for ERC20Permit
    /// @param s Signature component s used for ERC20Permit
    /// @return purchaseID 
    /// The NFT token ID mapped to the purchase, 
    /// which is minted from the `Ledger` contract.
    function purchaseItem (
        uint32 itemID,
        address token,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
        external
        returns (uint256 purchaseID)
    {
        require(payment.process(_msgSender(), itemID, token, v, r, s));
        purchaseID = ledger.logPurchase(itemID, _msgSender());
    }

}