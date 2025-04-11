//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ledger is Ownable, ERC721 
{
    struct Purchase 
    {
        uint256 tokenID;
        uint32 itemID;
        address owner;
        uint256 timestamp;
    }

    mapping (uint256 => Purchase) private purchases;

    constructor (address store) Ownable(store) ERC721("Ledger", "LEDG") {}

    function logPurchase (
        address buyer,
        uint32 itemID
    )
        external
        onlyOwner
        returns (uint256 tokenID)
    {

    }

    function getPurchaseID (
        address buyer,
        uint32 itemID,
        uint256 timestamp
    )
        external
        view
        returns (uint256 tokenID)
    {

    }


}