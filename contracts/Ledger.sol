// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./OwnableERC2771Context.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract Ledger is OwnableERC2771Context, ERC721 {
    struct Purchase {
        uint256 tokenID;
        uint32 itemID;
        address buyer;
        uint256 timestamp;
    }

    mapping(uint256 => Purchase) public purchases;
    address private store;

    constructor(address forwarderAddress)
        OwnableERC2771Context(msg.sender, forwarderAddress)
        ERC721("Ledger", "LEDG")
    {}

    function setStore(address storeAddress)
        external
        onlyOwner
    {
        store = storeAddress;
    }

    function logPurchase(
        uint32 itemID,
        address buyer
    )
        external
        returns (uint256 tokenID)
    {
        require(_msgSender() == store, "Unauthorized store");
        tokenID = getPurchaseID(buyer, itemID, block.timestamp);
        purchases[tokenID] = Purchase(tokenID, itemID, buyer, block.timestamp);
    }

    function getPurchaseID(
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

    function _msgSender()
        internal
        view
        override(Context, OwnableERC2771Context)
        returns (address sender)
    {
        return OwnableERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, OwnableERC2771Context)
        returns (bytes calldata)
    {
        return OwnableERC2771Context._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        override(Context, OwnableERC2771Context)
        returns (uint256)
    {
        return OwnableERC2771Context._contextSuffixLength();
    }
}
