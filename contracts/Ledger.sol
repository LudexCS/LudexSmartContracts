//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title Ledger
/// @author Ludex
/// @notice
/// NFT-minter contract where each of tokens is mapped to a single purchase
/// of an item in Ludex platform.
contract Ledger is Ownable, ERC721 
{
    struct Purchase 
    {
        uint256 tokenID;
        uint32 itemID;
        address buyer;
        uint256 timestamp;
    }

    mapping (uint256 => Purchase) private purchases;

    address private store;

    constructor () Ownable(msg.sender) ERC721("Ledger", "LEDG") {}

    function setStore(address storeAddress)
        external
        onlyOwner
    {
        store = storeAddress;
    }

    /// @notice
    /// Log a purchase history, and mint a new NFT that is mapped to the purchase
    /// @param itemID ID of the item that is being purchased
    /// @param buyer Address who gets the NFT
    /// @return tokenID ID of the NFT
    function logPurchase (
        uint32 itemID,
        address buyer
    )
        external
        returns (uint256 tokenID)
    {
        require(store == msg.sender);
        tokenID = getPurchaseID(buyer, itemID, block.timestamp);
        purchases[tokenID] = Purchase(tokenID, itemID, buyer, block.timestamp);
    }

    /// @notice
    /// From purchase info, create an ID that will identify the purchase
    /// @param buyer Address who owns the NFT
    /// @param itemID ID of the item that is or was purchased
    /// @param timestamp UNIX timestamp when the purchase take/took its place
    /// @return tokenID NFT token's ID
    function getPurchaseID (
        address buyer,
        uint32 itemID,
        uint256 timestamp
    )
        public
        pure
        returns (uint256 tokenID)
    {
        tokenID = uint256(keccak256(abi.encode(itemID, buyer, timestamp)));
    }


}