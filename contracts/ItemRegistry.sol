//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ItemRegistry is Ownable
{

    constructor (address owner_) Ownable(owner_) {}

    function registerItem (
        string calldata itemName, 
        address seller,
        uint32[] parents
    )
        external
        onlyOwner
        returns (uint32 itemID)
    {

    }

    function suspendItemSale (
        uint32 itemID
    )
        external
        onlyOwner
        returns (uint32[] suspensions)
    {

    }

    function resumeItemSale (
        uint32 itemID
    )  
        external
        onlyOwner
        returns (uint32[] resumedItems)
    {

    }


}