//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Utils.sol";

/// @title ItemRegistry
/// @author Ludex
/// @notice
/// A registry contract where the owner of platform maintains 
/// information about items and their relationship.
contract ItemRegistry is Ownable {
    
    using Utils for bytes;

    mapping (uint32 => address) public seller;
    mapping (uint32 => uint32[]) public itemParents;
    mapping (uint32 => uint8) public numberOfParents;
    mapping (uint32 => uint32[]) public itemChilds;
    mapping (uint32 => uint256) public timestampRegistered;

    mapping (uint32 => bool) suspensions;

    mapping (uint256 => uint32[]) private listGenerator;
    uint256 private listGenId;
 
    event ItemRegistered(
        string indexed itemName, 
        address indexed seller, 
        uint32 indexed itemID);

    event ItemSaleSuspended (
        uint32 indexed itemID, 
        uint32[] suspension);

    event ItemSaleResumed (
        uint32 indexed itemID, 
        uint32[] resumed);

    constructor (address owner_) Ownable(owner_) {}

    function parentOfItem(uint32 itemID, uint8 index)
        external
        view
        returns (uint32 parent)
    {
        return itemParents[itemID][index];
    }

    /// @notice
    /// Register a new item as on-sale. Emits ItemRegistered event.
    /// @param itemName New item's name
    /// @param seller_ New item's seller's address
    /// @param parents Items which the new item is influenced 
    function registerItem (
        string calldata itemName, 
        address seller_,
        uint32[] calldata parents
    )
        external
        onlyOwner
    {
        uint32 itemID = abi.encode(itemName, seller_).fnv1a32();
        seller[itemID] = seller_;
        itemParents[itemID] = parents;
        for (uint16 i = 0 ; i < parents.length; i ++)
        {
            itemChilds[parents[i]].push(itemID);
        }
        timestampRegistered[itemID] = block.timestamp;
        numberOfParents[itemID] = uint8(parents.length);
        emit ItemRegistered(itemName, seller_, itemID);
    }

    /// @notice Internal work for `suspendItemSale`
    function _suspendItemSale (
        uint32 itemID,
        uint32[] storage accumulation
    )
        private
    {
        accumulation.push(itemID);
        suspensions[itemID] = true;
        for (uint8 i = 0 ; i < itemChilds[itemID].length; i++)
        {
            _suspendItemSale(itemChilds[itemID][i], accumulation);
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
        suspensions[itemID] = true;
        for (uint8 i = 0; i < itemChilds[itemID].length; i ++)
        {
            _resumeItemSale(itemChilds[itemID][i], accumulation);
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

}