//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

    modifier onlyItemOnSale(uint32 itemID)
    {
        require(
            itemRegistry.isOnSale(itemID),
            "Item is not on sale");
        _;
    }

    /// @notice Perform permit-based approval for token transfer.
    function getPermission(
        address buyer,
        address token,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
        private
    {
        IERC20Permit(token).permit(
            buyer,
            address(payment),
            type(uint256).max,
            deadline,
            v, r, s
        );
    }

    function _isTokenPermitted (address buyer, address token)
        private 
        view
        returns (bool isPermitted)
    {
        IERC20 tokenContract = IERC20(token);

        uint256 paymentAllowance = 
            tokenContract.allowance(buyer, address(payment));

        isPermitted = paymentAllowance >= type(uint256).max / 2;
    }

    function isTokenPermitted(address token)
        external
        view
        returns (bool isPermitted)
    {
        return _isTokenPermitted(_msgSender(), token);
    }

    function _purchaseItem (address buyer, uint32 itemID, address token)
        private
        returns (uint256 purchaseID)
    {
        payment.process(buyer, itemID, token);
        purchaseID = ledger.logPurchase(itemID, buyer);

        emit ItemPurchased(itemID, buyer, purchaseID);
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
        onlyItemOnSale(itemID)
        returns (uint256 purchaseID)
    {
        require(
            _isTokenPermitted(_msgSender(), token),
            "Payment is not allowed");

        return _purchaseItem(_msgSender(), itemID, token);
    }

    function purchaseItemWithPermission(
        uint32 itemID,
        address token,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    )
        external
        onlyItemOnSale(itemID)
        returns (uint256 purchaseID)
    {
        if (_isTokenPermitted(_msgSender(), token))
        {
            return _purchaseItem(_msgSender(), itemID, token);
        }

        getPermission(_msgSender(), token, deadline, v, r, s);

        return _purchaseItem(_msgSender(), itemID, token);
    }

}