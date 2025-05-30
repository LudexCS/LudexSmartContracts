// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./Ledger.sol";
import "./Store.sol";

contract PurchaseProxy is Ownable {

    mapping(uint256 => uint32) public owner;

    struct PurchaseInfo {
        uint256 tokenID;
        uint32 itemID;
        uint32 buyer;
        uint256 timestamp;
    }

    Store private store;   
    Ledger private ledger;

    event PurchaseIDsClaimed(
        address indexed owner,
        uint256[] purchases);

    constructor (
        address storeAddress
    )
        Ownable(msg.sender)
    {
        store = Store(storeAddress);
        ledger = Ledger(store.ledger());
    }

    function purchaseItem(
        address token,
        uint32 itemID,
        uint32 ownerID  
    )
        external
        onlyOwner
    {
        uint256 purchaseID = store.purchaseWithPending(itemID, token);

        owner[purchaseID] = ownerID;
    }

    function claimPurchaseIDs(
        uint32 ownerID,
        address claimer,
        uint256[] calldata purchaseIDs
    )
        external
        onlyOwner
    {
        require(claimer != address(0), "Not a valid claimer address");

        for (uint32 i = 0 ; i < purchaseIDs.length; i ++)
        {
            uint256 purchaseID = purchaseIDs[i];
            require(owner[purchaseID] == ownerID, "Not item owner");
            ledger.transferFrom(address(this), claimer, purchaseID);
        }

        emit PurchaseIDsClaimed(
            claimer,
            purchaseIDs);
    }   

    function getPurchaseInfo(
        uint256 purchaseID
    )
        external
        view
        returns (PurchaseInfo memory purchase)
    {
        ( , uint32 itemID,  , uint256 timestamp) = 
            ledger.purchases(purchaseID);

        return PurchaseInfo(
            purchaseID,
            itemID,
            owner[purchaseID],
            timestamp);
    }
}