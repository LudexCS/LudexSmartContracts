//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ItemRegistry.sol";
import "./SellerRegistry.sol";

contract PriceTable is Ownable 
{

    struct PriceInfo 
    {
        address token;
        uint256 tokenAmount;
    }

    address[] paymentChannels;
    mapping (address => uint256) usdToToken;

    ItemRegistry itemRegistry;

    SellerRegistry sellerRegistry;

    mapping(uint32 => uint256) discountEndTimes;

    mapping(uint32 => uint8) revenueSharing;

    address constant storeAddress;

    constructor (
        address owner_,
        address store
    ) 
        Ownable(owner_) 
    {
        itemRegistry = new ItemRegistry(owner_);
        sellerRegistry = new SellerRegistry();
        storeAddress = store;
    }

    modifier onlyItemOnSale (uint32 itemID) {
        _;
    }

    modifier onlyItemSeller (uint32 itemID, address seller) {
        _;
    }

    function priceOfItemIn (
        uint32 itemID, 
        address token
    ) 
        view
        onlyItemOnSale(itemID)
        returns (uint256 tokenAmount)
    {

    }

    function getPriceInfoList (
        uint32 itemID
    )
        view
        onlyItemOnSale (itemID)
        returns (PriceInfo[] memory prices)
    {

    }

    function addPaymentChannel (
        address token
    )
        external
        onlyOwner
        returns (bool isSuccess)
    {

    }

    function removePaymentChannel (
        address token
    )   
        external
        onlyOwner
        returns (bool isSuccess)
    {

    }

    function changeItemPrice (
        address seller,
        uint32 itemID,
        uint256 usdPrice_
    )
        external
        onlyItemSeller(itemID, msg.sender)
        returns (uint256 prevPriceUsd)
    {

    }

    function startDiscount (
        address seller,
        uint32 itemID,
        uint256 usdPrice_,
        uint256 endTime
    )
        external
        onlyItemSeller (itemID, msg.sender)
    {

    }

    function changeExchangeRate (
        address paymentChannel,
        uint256 usdToToken_
    )
        external
        onlyOwner
        returns (uint256 prevRate)
    {

    }

}