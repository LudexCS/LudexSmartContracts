//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./OwnableERC2771Context.sol";
import "./ItemRegistry.sol";
import "./SellerRegistry.sol";


/// @title PriceTable
/// @author Ludex
/// @notice 
/// This contract is responsible for the management of following list:
/// - Tokens used for payments and their exchange rate
/// - Discount for items
/// - Revenue share rate between items
contract PriceTable is OwnableERC2771Context {

    struct PriceInfo 
    {
        address token;
        uint256 tokenAmount;
    }

    address[] public paymentChannels;

    mapping (address => uint256) public usdToToken;
    
    mapping (uint32 => uint256) public usdPrice;

    ItemRegistry public itemRegistry;

    SellerRegistry public sellerRegistry;

    mapping(uint32 => uint256) discountEndTimes;
    mapping(uint32 => uint256) discountUsdPrice;

    mapping(uint32 => uint16) public revenueSharing;

    address immutable storeAddress;

    constructor (
        address owner_,
        address forwarderAddress,
        address store
    ) 
        OwnableERC2771Context(owner_, forwarderAddress)
    {
        itemRegistry = new ItemRegistry(owner_);
        sellerRegistry = new SellerRegistry(owner_, forwarderAddress);
        storeAddress = store;
    }

    modifier onlyItemOnSale (uint32 itemID) {
        require(itemRegistry.seller(itemID) != address(0));
        _;
    }

    modifier onlyItemSeller (uint32 itemID, address seller) {
        require(itemRegistry.seller(itemID) == seller);
        _;
    }

    /// @notice Price of an item in US Dollar
    /// @param itemID ID of the item to inquire the price in USD
    /// @return price 
    /// Price of the item. MS 18 digits for the integer part, 
    /// LS 18 digits for the decimal part
    function getPriceUsd (
        uint32 itemID
    )
        public
        view
        returns (uint256 price)
    {
        if (discountEndTimes[itemID] >= block.timestamp)
        {
            return discountUsdPrice[itemID];
        }

        return usdPrice[itemID];
    }

    /// @notice Price of an item in given ERC-20 FT `token`
    /// @param itemID ID of the item to inquire the price in `token`
    /// @param token Address of contract which implements ERC-20 standard
    function priceOfItemIn (
        uint32 itemID, 
        address token
    ) 
        public
        view
        onlyItemOnSale(itemID)
        returns (uint256 tokenAmount)
    {
        require(
            usdToToken[token] != 0,
            "Not a valid payment channel");
        
        uint256 usdPrice_ = getPriceUsd(itemID);

        return usdPrice_ * usdToToken[token] / (10 ** 18);
    }

    /// @notice 
    /// Get a list of information in which 
    /// for each entry the address of ERC-20 token contract and
    /// the amount of that token the user should pay for the item
    /// @param itemID ID of the item
    function getPriceInfoList (
        uint32 itemID
    )
        external
        view
        onlyItemOnSale (itemID)
        returns (PriceInfo[] memory prices)
    {
        prices = new PriceInfo[](paymentChannels.length);
        for (uint16 i = 0; i < prices.length; i ++)
        {
            uint256 tokenPrice = priceOfItemIn(itemID, paymentChannels[i]);
            prices[i] = PriceInfo(paymentChannels[i], tokenPrice);
        }
    }

    /// @notice 
    /// Change a token's exchange rate from USD to given token
    /// This function can only be called by the owner of the platform
    /// @param paymentChannel ERC-20 contract's address
    /// @param usdToToken_ New exchange rate. 
    /// MS 18 digits for integer part, LS 18 digits for decimal part.
    /// @return prevRate Exchange rate from USD to `paymentChannel` 
    /// previously used
    function changeExchangeRate (
        address paymentChannel,
        uint256 usdToToken_
    )
        external
        onlyOwner
        returns (uint256 prevRate)
    {
        prevRate = usdToToken[paymentChannel];
        usdToToken[paymentChannel] = usdToToken_;
    }

    /// @notice 
    /// Add a new ERC-20 token contract to the platform as payment channel.
    /// This function can only be called by the owner of the platform.
    /// @param token The new token contract to be added
    function addPaymentChannel (
        address token,
        uint256 usdToToken_
    )
        external
        onlyOwner
    {
        require (
            usdToToken[token] == 0,
            "There's already a token contract assigned");
        
        usdToToken[token] = usdToToken_;

        paymentChannels.push(token);
    }

    /// @notice
    /// Remove a ERC-20 contract from the option of valid payment channels.
    /// This function can only be called by the owner of the platform.
    /// @param token The token contract to remove from the platform
    function removePaymentChannel (
        address token
    )   
        external
        onlyOwner
        returns (bool isSuccess)
    {
        require (
            usdToToken[token] != 0,
            "There's no token contract assigned");

        delete usdToToken[token];

        bool shouldShift = false;
        for (uint16 i = 0; i < paymentChannels.length - 1; i ++)
        {
            if (paymentChannels[i] == token)
            {
                shouldShift = true;
            }
            if (shouldShift)
            {
                paymentChannels[i] = paymentChannels[i + 1];
            }
        }

        return shouldShift;
    }

    /// @notice
    /// Change the price in USD for the item. 
    /// This function can only be called by the seller of the item.
    /// @param itemID ID of item whose price is updated
    /// @param usdPrice_ New price of item in USD
    /// New price of item in USD. MS 18 digits for integer part,
    /// LS 18 digits for decimal part.
    function changeItemPrice (
        uint32 itemID,
        uint256 usdPrice_
    )
        external
        onlyItemSeller(itemID, _msgSender())
        returns (uint256 prevPriceUsd)
    {
        prevPriceUsd = usdPrice[itemID];
        usdPrice[itemID] = usdPrice_;
    }

    /// @notice 
    /// Start a discount event for an item.
    /// This function can only be called by the seller of the item.
    /// @param itemID ID of item which which will be on discount
    /// @param usdPrice_ Price of discounted item 
    /// @param endTime UNIX time when the discount will be over
    function startDiscount (
        uint32 itemID,
        uint256 usdPrice_,
        uint256 endTime
    )
        external
        onlyItemSeller (itemID, _msgSender())
    {
        require(
            usdPrice[itemID] <= usdPrice_,
            "Discounted price should be lower than the original price");

        discountEndTimes[itemID] = endTime;
        discountUsdPrice[itemID] = usdPrice_;
    }
}