//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Utils.sol";
import "./PriceTable.sol";
import "./SellerProxy.sol";

/// @title ItemRegistry
/// @author Ludex
/// @notice
/// A registry contract where the owner of platform maintains 
/// information about items and their relationship.
contract ItemRegistry is Ownable {
    
    using Utils for bytes;

    mapping (uint32 => address) public seller;
    mapping (address => uint32[]) private itemsOfSeller;

    mapping (uint32 => uint32[]) public itemRevenueSharers;
    mapping (uint32 => uint8) public numberOfSharers;
    mapping (uint32 => uint32[]) public revenueSharingItems;
    mapping (uint32 => uint256) public timestampRegistered;

    mapping (uint32 => bool) public isOnSale;

    mapping (uint256 => uint32[]) private listGenerator;
    uint256 private listGenId;

    PriceTable private priceTable;
    address private sellerProxy;
 
    event ItemRegistered(
        bytes32 indexed itemName, 
        address indexed seller, 
        uint32 indexed itemID,
        uint256 usdPrice,
        uint32[] shareItemIDs);

    event ItemSaleSuspended (
        uint32 indexed itemID, 
        uint32[] suspension);

    event ItemSaleResumed (
        uint32 indexed itemID, 
        uint32[] resumed);

    constructor () 
        Ownable(msg.sender) 
    {}

    function setPriceTable(address priceTableAddress)
        external
        onlyOwner
    {
        priceTable = PriceTable(priceTableAddress);
    }

    function setSellerProxy(address sellerProxy_)
        external
        onlyOwner
    {
        sellerProxy = sellerProxy_;
    }

    modifier onlyRegistrationHandler()
    {
        require(
            msg.sender == owner() ||
            (sellerProxy != address(0) && msg.sender == sellerProxy),
            "Not a registration handler");
        _;
    }

    function getItemsOfSeller(
        address seller_
    )
        external
        view
        returns (uint32[] memory)
    {
        uint32 length = uint32(itemsOfSeller[seller_].length);
        uint32 skipCount = 0;
        for (uint32 i = 0; i < length; i ++)
        {
            uint32 itemID = itemsOfSeller[seller_][i];
            if (seller[itemID] != seller_)
            {
                skipCount ++;
            }
        }

        uint32[] memory items = new uint32[](length - skipCount);
        uint32 j = 0;
        for (uint32 i = 0; i < length; i ++)
        {
            uint32 itemID = itemsOfSeller[seller_][i];
            if (seller[itemID] != seller_) 
                continue;
            items[j] = itemsOfSeller[seller_][i];
            j++;
        }

        return items;
    }

    function revenueSharerOfItem(uint32 itemID, uint8 index)
        external
        view
        returns (uint32 parent)
    {
        return itemRevenueSharers[itemID][index];
    }

    function nameHash(
        string calldata nameToHash
    )
        public
        pure
        returns (bytes32 hash)
    {
        hash = keccak256(abi.encodePacked(nameToHash));
    }

    function registerItem (
        bytes32 itemNameHash, 
        address seller_,
        uint32[] calldata revenueSharers,
        uint256 usdPrice,
        uint32[] calldata shareTerms,
        uint16[] calldata shares
    )
        external
        onlyRegistrationHandler
        returns (uint32 itemID, uint32[] memory itemShareIDs)
    {
        itemID = abi.encode(itemNameHash, seller_).fnv1a32();

        seller[itemID] = seller_;
        isOnSale[itemID] = true;
        itemsOfSeller[seller_].push(itemID);

        itemRevenueSharers[itemID] = revenueSharers;
        for (uint16 i = 0 ; i < revenueSharers.length; i ++)
        {
            revenueSharingItems[revenueSharers[i]].push(itemID);
        }
        timestampRegistered[itemID] = block.timestamp;
        numberOfSharers[itemID] = uint8(revenueSharers.length);

        assert(priceTable.initializeItemPrice(itemID, usdPrice, 0));

        itemShareIDs = new uint32[](shareTerms.length);
        for (uint16 i = 0; i < shareTerms.length; i ++)
        {
            uint32 shareTermID = shareTerms[i];
            uint32 itemShareID = abi.encode(itemID, shareTermID).fnv1a32();

            seller[itemShareID] = seller_;
            isOnSale[itemShareID] = true;
            itemsOfSeller[seller_].push(itemShareID);

            assert(
                priceTable.initializeItemPrice(
                    itemShareID, 
                    type(uint32).max, 
                    shares[i]));
            itemShareIDs[i] = itemShareID;
        }

        emit ItemRegistered(
            itemNameHash, 
            seller_, 
            itemID, 
            usdPrice,
            itemShareIDs);
    }

    /// @notice Internal work for `suspendItemSale`
    function _suspendItemSale (
        uint32 itemID,
        uint32[] storage accumulation
    )
        private
    {
        accumulation.push(itemID);
        isOnSale[itemID] = false;
        for (uint8 i = 0 ; i < revenueSharingItems[itemID].length; i++)
        {
            _suspendItemSale(revenueSharingItems[itemID][i], accumulation);
        }
    }

    /// @notice 
    /// Halt a item sale until the owner resume, 
    /// emits ItemSaleSuspended event
    /// @param itemID ID of item to put a stop on sale
    function suspendItemSale (
        uint32 itemID
    )
        external
        onlyOwner
    {
        uint32[] storage list = listGenerator[++listGenId];
        _suspendItemSale(itemID, list);
        emit ItemSaleSuspended(itemID, list);
    }

    /// @notice Internal work for `resumeItemSale`
    function _resumeItemSale (
        uint32 itemID,
        uint32[] storage accumulation
    )
        private
    {
        accumulation.push(itemID);
        isOnSale[itemID] = true;
        for (uint8 i = 0; i < revenueSharingItems[itemID].length; i ++)
        {
            _resumeItemSale(revenueSharingItems[itemID][i], accumulation);
        }
    }

    /// @notice Resume sale for the item. Emits ItemSaleResumed event
    /// @param itemID ID of the item to be sold again
    function resumeItemSale (
        uint32 itemID
    )  
        external
        onlyOwner
    {
        uint32[] storage list = listGenerator[++listGenId];
        _resumeItemSale(itemID, list);
        emit ItemSaleResumed(itemID, list);
    }

    function transferSellerRight(
        uint32 itemID,
        address newSeller
    )
        external
        onlyRegistrationHandler
    {
        require(
            _msgSender() == seller[itemID],
            "Not item seller");
        
        seller[itemID] = newSeller;
        itemsOfSeller[newSeller].push(itemID);
    }

}