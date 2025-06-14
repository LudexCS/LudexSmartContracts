//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

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

    struct RevShare
    {
        uint16 sharePermyriad;
        uint256 timestamp;
    }

    address[] public paymentChannels;

    mapping (address => uint256) public usdToToken;
    
    mapping (uint32 => uint256) public usdPrice;

    ItemRegistry public itemRegistry;

    SellerRegistry public sellerRegistry;

    mapping(uint32 => uint256) public discountEndTime;
    mapping(uint32 => uint256) public discountUsdPrice;

    mapping(uint32 => RevShare[]) public revenueSharing;
    mapping(uint32 => uint256) public revShareReductionEndTime;
    mapping(uint32 => uint16) public reducedRevShare;

    event ItemPriceChanged(
        uint32 indexed itemID,
        uint256 indexed newUsdPrice,
        uint256 indexed prevUsdPrice);

    event DiscountStarted(
        uint32 indexed itemID,
        uint256 indexed discountedPrice);

    event ExchangeRateChanged(
        address indexed token,
        uint256 indexed newUsdToToken, 
        uint256 indexed prevUsdToToken);

    event PaymentChannelAdded(
        address indexed token,
        uint256 indexed usdToToken_);

    event PaymentChannelRemoved(
        address indexed token,
        bool isSuccess);

    event RevShareChanged(
        uint32 indexed itemID,
        uint16 indexed newShare,
        uint16 indexed prevShare);

    event RevShareReductionStarted(
        uint32 indexed itemID,
        uint16 indexed reducedShare);

    constructor (
        address forwarderAddress,
        address itemRegistryAddress,
        address sellerRegistryAddress
    ) 
        OwnableERC2771Context(msg.sender, forwarderAddress)
    {
        itemRegistry = ItemRegistry(itemRegistryAddress);
        sellerRegistry = SellerRegistry(sellerRegistryAddress);
    }

    modifier onlyRegisteredItem (uint32 itemID) {
        require(
            itemRegistry.seller(itemID) != address(0),
            "This item is not registered");
        _;
    }

    modifier onlyItemSeller (uint32 itemID, address seller) {
        require(itemRegistry.seller(itemID) == seller);
        _;
    }

    modifier onlyRegistry () {
        require(
            msg.sender == address(itemRegistry),
            "This function call can only be made by ItemRegistry");
        _;
    }

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
        uint256 base = usdPrice[itemID];
        uint256 totalReduced = 0;

        uint8 numSharers = itemRegistry.numberOfSharers(itemID);
        for (uint8 i = 0; i < numSharers; i++) {
            uint32 sharerId = itemRegistry.revenueSharerOfItem(itemID, i);
            uint16 currentShare = getRevShare(sharerId, itemID);
            uint16 originalShare = getDeclaredShare(sharerId, itemID);
            if (originalShare > currentShare) {
                totalReduced += (base * (originalShare - currentShare)) / 10_000;
            }
        }

        uint256 reducedPrice = base - totalReduced;

        if (discountEndTime[itemID] >= block.timestamp) {
            uint256 discount = discountUsdPrice[itemID];
            return reducedPrice < discount ? reducedPrice : discount;
        }

        return reducedPrice;
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
        onlyRegisteredItem(itemID)
        returns (uint256 tokenAmount)
    {
        require(
            usdToToken[token] != 0,
            "Not a valid payment channel");
        
        uint256 usdPrice_ = getPriceUsd(itemID);

        return usdPrice_ * usdToToken[token] / 1e18;
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
        onlyRegisteredItem (itemID)
        returns (PriceInfo[] memory prices)
    {
        prices = new PriceInfo[](paymentChannels.length);
        for (uint16 i = 0; i < prices.length; i ++)
        {
            uint256 tokenPrice = priceOfItemIn(itemID, paymentChannels[i]);
            prices[i] = PriceInfo(paymentChannels[i], tokenPrice);
        }
    }

    function getDeclaredShare(
        uint32 sharerID,
        uint32 itemID
    ) 
        public 
        view 
        returns (uint16) 
    {
        uint256 timestamp = itemRegistry.timestampRegistered(itemID);
        uint16 declaredShare = 0;

        for (uint256 i = 0; i < revenueSharing[sharerID].length; i++) {
            if (revenueSharing[sharerID][i].timestamp <= timestamp) {
                declaredShare = revenueSharing[sharerID][i].sharePermyriad;
            } else {
                break;
            }
        }

        return declaredShare;
    }

    function getRevShare(
        uint32 sharerID,
        uint32 itemID
    )
        public
        view
        onlyRegisteredItem (sharerID)
        returns (uint16 revShare)
    {
        // 1. 본인의 선언된 지분
        uint16 declaredShare = getDeclaredShare(sharerID, itemID);

        // 2. 본인의 감면 지분 (if any)
        uint16 reducedSelf = type(uint16).max;
        if (revShareReductionEndTime[sharerID] > block.timestamp) {
            reducedSelf = reducedRevShare[sharerID];
        }

        // 3. upstream 감면 누적 계산
        uint16 upstreamReductionTotal = 0;
        uint8 numParents = itemRegistry.numberOfSharers(sharerID);
        for (uint8 i = 0; i < numParents; i++) {
            uint32 parent = itemRegistry.revenueSharerOfItem(sharerID, i);
            uint16 current = getRevShare(parent, sharerID);

            uint16 declared = 0;
            RevShare[] memory parentHistory = revenueSharing[parent];
            uint256 parentTimestamp = itemRegistry.timestampRegistered(sharerID);
            for (uint256 j = 0; j < parentHistory.length; j++) {
                if (parentHistory[j].timestamp <= parentTimestamp) {
                    declared = parentHistory[j].sharePermyriad;
                } else {
                    break;
                }
            }

            if (declared > current) {
                upstreamReductionTotal += (declared - current);
            }
        }

        // 4. 최종 지분 계산
        uint16 upstreamEffect = 
            10000 > upstreamReductionTotal 
            ?   10000 - upstreamReductionTotal 
            :   0;
        uint256 product = uint256(declaredShare) * uint256(upstreamEffect);
        uint256 result = product / 10000;

        require(result <= type(uint16).max, string(abi.encodePacked(
            "overflow: declared=", Strings.toString(declaredShare),
            ", effect=", Strings.toString(upstreamEffect),
            ", result=", Strings.toString(result)
        )));

        revShare = uint16(result);

        if (reducedSelf < revShare) {
            revShare = reducedSelf;
        }
    }

    /// @notice 
    /// Change a token's exchange rate from USD to given token
    /// This function can only be called by the owner of the platform
    /// Emits ExchangeRateChanged event.
    /// @param paymentChannel ERC-20 contract's address
    /// @param usdToToken_ New exchange rate. 
    /// MS 18 digits for integer part, LS 18 digits for decimal part.
    function changeExchangeRate (
        address paymentChannel,
        uint256 usdToToken_
    )
        external
        onlyOwner
    {
        uint256 prevRate = usdToToken[paymentChannel];
        usdToToken[paymentChannel] = usdToToken_;

        emit ExchangeRateChanged(paymentChannel, usdToToken_, prevRate);
    }

    /// @notice 
    /// Add a new ERC-20 token contract to the platform as payment channel.
    /// This function can only be called by the owner of the platform.
    /// Emits PaymentChannelAdded event.
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

        try ERC20(token).decimals() returns (uint8) {
        } catch  {
            revert("Given token doesn't implement decimals");   
        }
        
        usdToToken[token] = usdToToken_;

        paymentChannels.push(token);

        emit PaymentChannelAdded(token, usdToToken_);
    }

    /// @notice
    /// Remove a ERC-20 contract from the option of valid payment channels.
    /// This function can only be called by the owner of the platform.
    /// Emits PaymentChannelRemoved event.
    /// @param token The token contract to remove from the platform
    function removePaymentChannel (
        address token
    )   
        external
        onlyOwner
    {
        require (
            usdToToken[token] != 0,
            "There's no token contract assigned");

        delete usdToToken[token];

        bool shouldShift = false;
        bool isSuccess = false;
        uint256 numberOfPaymentChannels = paymentChannels.length;
        for (uint16 i = 0; i < numberOfPaymentChannels - 1; i ++)
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
        if (paymentChannels[numberOfPaymentChannels - 1] == token || shouldShift)
        {
            delete paymentChannels[numberOfPaymentChannels - 1];
            isSuccess = true;
        }

        emit PaymentChannelRemoved(token, isSuccess);
    }

    /// @notice
    /// Change the price in USD for the item. 
    /// This function can only be called by the seller of the item.
    /// Emits ItemPriceChanged event.
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
    {
        uint256 prevPriceUsd = usdPrice[itemID];
        usdPrice[itemID] = usdPrice_;

        emit ItemPriceChanged(itemID, usdPrice_, prevPriceUsd);
    }

    /// @notice 
    /// Start a discount event for an item.
    /// This function can only be called by the seller of the item.
    /// Emits DiscountStarted event
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
            discountEndTime[itemID] < block.timestamp,
            "There's discount ongoing already");
    
        require(
            usdPrice[itemID] > usdPrice_,
            "Discounted price should be lower than the original price");

        discountEndTime[itemID] = endTime;
        discountUsdPrice[itemID] = usdPrice_;

        emit DiscountStarted(itemID, usdPrice_);
    }

    function changeRevShare(
        uint32 itemID,
        uint16 newSharePermyriad
    )
        external
        onlyItemSeller(itemID, _msgSender())
    {
        uint256 length = revenueSharing[itemID].length;
        uint16 prevShare = revenueSharing[itemID][length - 1].sharePermyriad;

        revenueSharing[itemID].push(RevShare(newSharePermyriad, block.timestamp));

        emit RevShareChanged(itemID, newSharePermyriad, prevShare);
    }   

    function startRevShareReductionEvent(
        uint32 itemID,
        uint16 reducedShare,
        uint256 endTime
    )  
        external
        onlyItemSeller(itemID, _msgSender())
    {
        require(
            revShareReductionEndTime[itemID] < block.timestamp,
            "There's reduction event ongoing already"); 

        revShareReductionEndTime[itemID] = endTime;
        reducedRevShare[itemID] = reducedShare;

        emit RevShareReductionStarted(
            itemID,
            reducedShare);
    }

    function initializeItemPrice (
        uint32 itemID,
        uint256 usdPrice_,
        uint16 revenueShare
    )
        external
        onlyRegistry
        returns (bool isSuccess)
    {
        isSuccess = itemRegistry.seller(itemID) != address(0);

        revenueSharing[itemID].push(RevShare(revenueShare, block.timestamp));

        usdPrice[itemID] = usdPrice_;
    }

}