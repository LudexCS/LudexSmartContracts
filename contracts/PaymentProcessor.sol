//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";

import "./OwnableERC2771Context.sol";
import "./ItemRegistry.sol";
import "./SellerRegistry.sol";
import "./PriceTable.sol";

/// @title PaymentProcessor
/// @author Ludex
/// @notice
/// The contract where the actual token transfer happens,
/// with automatic revenue share from the pay for the item, 
/// up to the item ancestor hierarchy.
contract PaymentProcessor is OwnableERC2771Context
{
    /// @dev 
    /// Struct for information of history of fee rate in this platform
    struct FeeRateLogEntry {
        /// @dev UNIX time
        uint256 timestamp;
        /// @dev Permyriad
        uint16 feeRate;
    }

    FeeRateLogEntry[] feeRateLog;
    ItemRegistry itemRegistry;
    SellerRegistry sellerRegistry;
    PriceTable priceTable;

    uint256 permissionDeadline = 1 hours;

    constructor (
        address owner_,
        address forwarderAddress,
        uint16 initialFeeRate,
        PriceTable priceTable_
    ) 
        OwnableERC2771Context(forwarderAddress, owner_)
    {
        feeRateLog.push(FeeRateLogEntry(block.timestamp, initialFeeRate));
        priceTable = priceTable_;
        itemRegistry = priceTable_.itemRegistry();
        sellerRegistry = priceTable_.sellerRegistry();
    }

    /// @notice 
    /// Fee rate when the item is added in the registry
    /// @param itemID ID of item to inquire
    /// @return feeRate Fee rate that the seller agreed upon. Permyriad scale.
    function paymentFeeRate (uint32 itemID)
        private
        view
        returns (uint16 feeRate)
    {
        uint256 timestamp = priceTable.itemRegistry().timestampRegistered(itemID);
        feeRate = feeRateLog[feeRateLog.length - 1].feeRate;
        uint256 i = 0;
        for (i = 0; i < feeRateLog.length; i ++)
        {
            if (feeRateLog[i].timestamp >= timestamp)
            {
                i --;
                break;
            }
        }
        if (feeRateLog[i].feeRate < feeRate)
            feeRate = feeRateLog[i].feeRate;
    }

    /// @notice
    /// Send `desiredToken` from `from` to `to` by the amount
    /// that is exchaneable to `usdMount`. 
    /// If `to` doesn't want to receive the profit in `desiredToken`,
    /// He/she/they will be paid via platform's main token.
    function transferToken (
        address from,
        address to,
        uint256 usdAmount,
        address desiredToken
    )
        private
        returns (bool success)
    {
        if (sellerRegistry.paymentChannels(to, desiredToken))
        {
            IERC20 tokenContract = IERC20(desiredToken);
            uint256 tokenAmount = 
                usdAmount * priceTable.usdToToken(desiredToken);
            return tokenContract.transferFrom(from, to, tokenAmount);
        } 
        else 
        {
            address mainToken = priceTable.paymentChannels(0);
            IERC20 mainTokenContract = IERC20(mainToken);
            uint256 mainTokenAmount = 
                usdAmount * priceTable.usdToToken(mainToken);
            if (!mainTokenContract.transfer(to, mainTokenAmount))
            {
                return false;
            }

            IERC20 desiredTokenContract = IERC20(desiredToken);
            uint256 desiredTokenAmount = 
                usdAmount * priceTable.usdToToken(desiredToken);
            return 
                desiredTokenContract.transferFrom(
                    from, owner(), desiredTokenAmount);
        }
    }

    /// @notice
    /// Recursively, share the revenue denoted in USD via `desiredToken`, 
    /// up the revenue share hierarchy. 
    /// @param buyer Buyer who bought the item
    /// @param itemID ID of item whose seller should get 
    /// his/her/their/its claimable stake
    /// @param revenueUsd Revenue that arises from the item
    /// @param desiredToken ERC-20 token which the `buyer` wants to pay via
    function shareRevenue (
        address buyer,
        uint32 itemID,
        uint256 revenueUsd,
        address desiredToken
    ) 
        private
        returns (bool success)
    {
        //uint32[] storage parents = itemRegistry.itemParents(itemID);
        uint8 numberOfParents = itemRegistry.numberOfSharers(itemID);
        uint256 childStake = revenueUsd;
        for (uint8 i = 0; i < numberOfParents; i ++)
        {
            uint32 parent = itemRegistry.revenueSharerOfItem(itemID, i);
            uint16 share = priceTable.revenueSharing(parent);
            uint256 parentStake = revenueUsd / 10000 * share;
            childStake -= parentStake;
            require(
                shareRevenue(
                    buyer,
                    parent,
                    parentStake,
                    desiredToken));
        }
        return 
            transferToken( 
                buyer,
                itemRegistry.seller(itemID),
                childStake,
                desiredToken);
    }

    /// @notice
    /// Process the payment for an item with the address of `buyer` and
    /// his/her/their desired token as payment channel
    /// @param buyer Address who will get ownership of the item
    /// @param itemID ID of item to purchase
    /// @param token Address of ERC-20 contract by which the payment will happen
    /// @param v Signature component v used for ERC20Permit
    /// @param r Signature component r used for ERC20Permit
    /// @param s Signature component s used for ERC20Permit
    function process (
        address buyer,
        uint32 itemID,
        address token,
        uint8 v,
        bytes32 r,
        bytes32 s
    )   
        external
        returns (bool success)
    {
        IERC20Permit tokenPermission = IERC20Permit(token);
        tokenPermission.permit(
            buyer, 
            address(this),
            priceTable.priceOfItemIn(itemID, token),
            block.timestamp + permissionDeadline,
            v, r, s);

        uint256 usdPrice_ = priceTable.usdPrice(itemID);

        uint16 feeRate = paymentFeeRate(itemID);
        uint256 feeUsd = usdPrice_ / 10000 * feeRate; 
        transferToken(buyer, owner(), feeUsd, token);

        return 
            shareRevenue(
                buyer,
                itemID,
                usdPrice_ - feeUsd,
                token);
    }

    /// @notice
    /// Change deadline of permission for ERC20Permit in upcoming payments.
    /// This function can only be called by the owner of platform.
    function changePermissionDeadline(
        uint256 newDeadline
    )
        external
        onlyOwner
    {
        permissionDeadline = newDeadline;
    }
}