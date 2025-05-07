// SPDX-License-Identifier: MIT
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
/// Handles payments via permit-based meta-transactions and internally tracks token balances for sellers.
contract PaymentProcessor is OwnableERC2771Context {
    struct FeeRateLogEntry {
        uint256 timestamp;
        uint16 feeRate; // permyriad
    }

    FeeRateLogEntry[] public feeRateLog;
    ItemRegistry public itemRegistry;
    SellerRegistry public sellerRegistry;
    PriceTable public priceTable;

    uint256 public permissionDeadline = 1 hours;

    // Escrow balances per token per seller
    mapping(address => mapping(address => uint256)) public sellerTokenEscrow; // seller => token => amount
    mapping(address => mapping(address => bool)) public isSellerToPay; // seller => token => isPending
    mapping(address => address[]) public sellersToPay; // token => list of sellers

    event ProfitClaimed(address indexed seller, address indexed token, uint256 indexed amount);

    constructor(
        address forwarderAddress,
        uint16 initialFeeRate,
        address priceTableAddress
    ) 
        OwnableERC2771Context(msg.sender, forwarderAddress) 
    {
        feeRateLog.push(FeeRateLogEntry(block.timestamp, initialFeeRate));
        priceTable = PriceTable(priceTableAddress);
        itemRegistry = priceTable.itemRegistry();
        sellerRegistry = priceTable.sellerRegistry();
    }

    function paymentFeeRate(uint32 itemID) private view returns (uint16 feeRate) {
        uint256 timestamp = priceTable.itemRegistry().timestampRegistered(itemID);
        feeRate = feeRateLog[feeRateLog.length - 1].feeRate;
        for (uint256 i = 0; i < feeRateLog.length; i++) {
            if (feeRateLog[i].timestamp >= timestamp) {
                if (i > 0) i--;
                feeRate = feeRateLog[i].feeRate;
                break;
            }
        }
    }

    function process(
        address buyer,
        uint32 itemID,
        address token,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) 
        external 
    {
        // Permit
        IERC20Permit(token).permit(
            buyer,
            address(this),
            type(uint256).max,
            deadline,
            v, r, s
        );

        // Transfer tokens
        uint256 usdPrice = priceTable.usdPrice(itemID);
        uint256 tokenAmount = usdPrice * priceTable.usdToToken(token);
        require(IERC20(token).transferFrom(buyer, address(this), tokenAmount), "Transfer failed");

        // Calculate and immediately send platform fee to owner
        uint16 feeRate = paymentFeeRate(itemID);
        uint256 feeTokenAmount = tokenAmount * feeRate / 10000;
        require(IERC20(token).transfer(owner(), feeTokenAmount), "Fee transfer failed");

        // Remaining to share
        uint256 remainingTokenAmount = tokenAmount - feeTokenAmount;
        _shareRevenue(itemID, token, remainingTokenAmount);
    }

    function _shareRevenue(uint32 itemID, address token, uint256 tokenAmount) 
        private 
    {
        uint8 sharers = itemRegistry.numberOfSharers(itemID);
        uint256 childShare = tokenAmount;
        for (uint8 i = 0; i < sharers; i++) {
            uint32 parentID = itemRegistry.revenueSharerOfItem(itemID, i);
            uint16 share = priceTable.revenueSharing(parentID);
            uint256 parentStake = tokenAmount * share / 10000;
            childShare -= parentStake;
            _shareRevenue(parentID, token, parentStake);
        }

        address seller = itemRegistry.seller(itemID);
        sellerTokenEscrow[seller][token] += childShare;
        if (!isSellerToPay[seller][token]) {
            sellersToPay[token].push(seller);
            isSellerToPay[seller][token] = true;
        }
    }

    // This feature is for geth console, not web3
    function distribute(address token) 
        external 
        onlyOwner 
    {
        address[] storage list = sellersToPay[token];
        for (uint256 i = 0; i < list.length; i++) {
            address seller = list[i];
            uint256 balance = sellerTokenEscrow[seller][token];
            if (balance == 0) continue;

            require(IERC20(token).transfer(seller, balance), "Distribute failed");

            sellerTokenEscrow[seller][token] = 0;
            isSellerToPay[seller][token] = false;
        }
        delete sellersToPay[token];
    }

    function claim(address token) 
        external 
    {
        address seller = _msgSender();
        uint256 balance = sellerTokenEscrow[seller][token];
        require(balance > 0, "No balance to claim");

        sellerTokenEscrow[seller][token] = 0;
        isSellerToPay[seller][token] = false;

        require(IERC20(token).transfer(seller, balance), "Claim failed");

        emit ProfitClaimed(_msgSender(), token, balance);
    }

    function changePermissionDeadline(uint256 newDeadline) 
        external 
        onlyOwner
    {
        permissionDeadline = newDeadline;
    }
}
