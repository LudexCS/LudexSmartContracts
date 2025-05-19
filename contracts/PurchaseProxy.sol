// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./Ledger.sol";
import "./Store.sol";

contract PurchaseProxy is Ownable {

    mapping(uint32 => uint256[]) public owner;

    Store private store;   
    IERC721 private ledger;

    constructor (
        address storeAddress
    )
        Ownable(msg.sender)
    {
        store = Store(storeAddress);
        ledger = IERC721(store.ledger());
    }

    function purchaseItem(
        address token,
        uint32 itemID,
        uint32 ownerID  
    )
        external
        onlyOwner
    {
        IERC20 tokenContract = IERC20(token);

        uint256 allowance = 
            tokenContract.allowance(address(this), address(store.payment()));

        if (allowance < (type(uint256).max / 2)) 
            tokenContract.approve(address(store.payment()), type(uint256).max);

        uint256 purchaseID = store.purchaseItem(itemID, token);

        owner[ownerID].push(purchaseID);
    }

    function claimPurchaseIDs(
        uint32 ownerID,
        address claimer,
        address token
    )
        external
        onlyOwner
    {
        IERC20 tokenContract = IERC20(token);

        while (owner[ownerID].length > 0)
        {
            uint256 purchaseID = owner[ownerID][owner[ownerID].length - 1];
            tokenContract.transferFrom(address(this), claimer, purchaseID);
            owner[ownerID].pop();
        }
    }   
}