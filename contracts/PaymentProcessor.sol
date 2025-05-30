// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";

import "./OwnableERC2771Context.sol";
import "./ItemRegistry.sol";
import "./SellerRegistry.sol";
import "./PriceTable.sol";
import "./ProfitEscrow.sol";

/// @title PaymentProcessor
/// @author Ludex
/// @notice Handles token transfers and revenue sharing into ProfitEscrow.
contract PaymentProcessor is OwnableERC2771Context {
    struct FeeRateLogEntry {
        uint256 timestamp;
        uint16 feeRate; // permyriad (100 = 1%)
    }

    FeeRateLogEntry[] public feeRateLog;

    ItemRegistry public itemRegistry;
    SellerRegistry public sellerRegistry;
    PriceTable public priceTable;
    ProfitEscrow public profitEscrow;

    address public store;

    uint256 public permissionDeadline = 1 hours;

    constructor(
        address forwarderAddress,
        uint16 initialFeeRate,
        address priceTableAddress,
        address profitEscrowAddress
    )
        OwnableERC2771Context(msg.sender, forwarderAddress)
    {
        feeRateLog.push(FeeRateLogEntry(block.timestamp, initialFeeRate));

        priceTable = PriceTable(priceTableAddress);
        itemRegistry = priceTable.itemRegistry();
        sellerRegistry = priceTable.sellerRegistry();
        profitEscrow = ProfitEscrow(profitEscrowAddress);
    }

    modifier onlyStore()
    {
        require(_msgSender() == store, "Not authorized store");
        _;
    }

    function setStore(address storeAddress)
        external
        onlyOwner
    {
        store = storeAddress;
    }

    /// @notice Calculate fee rate for an item based on its registration time.
    function paymentFeeRate(
        uint32 itemID
    )
        private
        view
        returns (uint16 feeRate)
    {
        uint256 timestamp = itemRegistry.timestampRegistered(itemID);
        feeRate = feeRateLog[feeRateLog.length - 1].feeRate;

        for (uint256 i = 0; i < feeRateLog.length; i++) {
            if (feeRateLog[i].timestamp >= timestamp) {
                if (i > 0) i--;
                feeRate = feeRateLog[i].feeRate;
                break;
            }
        }
    }
    /// @notice Process token transfer and fee/revenue split.
    function process(
        address buyer,
        uint32 itemID,
        address token
    )
        external
        onlyStore
    {
        uint256 tokenAmount = priceTable.priceOfItemIn(itemID, token);
        require(
            IERC20(token).transferFrom(buyer, address(this), tokenAmount),
            "Transfer failed"
        );

        uint16 feeRate = paymentFeeRate(itemID);
        uint256 feeTokenAmount = (tokenAmount * feeRate) / 10000;

        require(
            IERC20(token).transfer(owner(), feeTokenAmount),
            "Fee transfer failed"
        );

        uint256 remainingTokenAmount = tokenAmount - feeTokenAmount;

        _shareRevenue(itemID, token, remainingTokenAmount);
    }

    /// @notice Internal revenue split logic based on recursive parent chain.
    function _shareRevenue(
        uint32 itemID,
        address token,
        uint256 tokenAmount
    )
        private
    {
        uint8 sharers = itemRegistry.numberOfSharers(itemID);
        uint256 childShare = tokenAmount;

        for (uint8 i = 0; i < sharers; i++) {
            uint32 parentID = itemRegistry.revenueSharerOfItem(itemID, i);
            uint16 share = priceTable.getRevShare(parentID, itemID);
            uint256 parentStake = (tokenAmount * share) / 10000;

            childShare -= parentStake;

            _shareRevenue(parentID, token, parentStake); // recursive
        }

        require(
            IERC20(token).transfer(address(profitEscrow), childShare),
            "Transfer to escrow failed"
        );

        profitEscrow.accumulate(itemID, token, childShare);
    }

    function processWithPending(
        uint32 itemID,
        address token
    )
        external
        onlyStore
    {
        uint256 tokenAmount = priceTable.priceOfItemIn(itemID, token);

        uint16 feeRate = paymentFeeRate(itemID);
        uint256 feeTokenAmount = (tokenAmount * feeRate) / 10000;

        uint256 remainingTokenAmount = tokenAmount - feeTokenAmount;

        _recordSharedPendingProfit(itemID, token, remainingTokenAmount);
    }

    function _recordSharedPendingProfit (
        uint32 itemID,
        address token,
        uint256 tokenAmount
    )
        private
    {
        uint8 sharers = itemRegistry.numberOfSharers(itemID);
        uint256 childShare = tokenAmount;

        for (uint8 i = 0; i < sharers; i++) {
            uint32 parentID = itemRegistry.revenueSharerOfItem(itemID, i);
            uint16 share = priceTable.getRevShare(parentID, itemID);
            uint256 parentStake = (tokenAmount * share) / 10000;

            childShare -= parentStake;

            _recordSharedPendingProfit(parentID, token, parentStake);
        }

        profitEscrow.accumulatePendingProfit(itemID, token, childShare);
    }

    /// @notice Change the expiration time allowed for permit usage.
    function changePermissionDeadline(
        uint256 newDeadline
    )
        external
        onlyOwner
    {
        permissionDeadline = newDeadline;
    }
}
