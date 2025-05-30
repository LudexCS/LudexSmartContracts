// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./OwnableERC2771Context.sol";
import "./ItemRegistry.sol";
import "./PriceTable.sol";

contract ProfitEscrow is OwnableERC2771Context {
    ItemRegistry public immutable itemRegistry;
    PriceTable public immutable priceTable;
    address public paymentProcessor;

    // itemID => token => amount
    mapping(uint32 => mapping(address => uint256)) private profit;

    mapping(uint32 => mapping(address => uint256)) private pendingProfit;
    mapping(address => uint256) private wholePendingProfit;

    event ProfitClaimed(
        uint32 indexed itemID,
        address indexed token,
        address indexed recipient,
        uint256 amount
    );

    event ProfitAccumulated(
        uint32 indexed itemID,
        address indexed token,
        uint256 amount
    );

    event ProfitPending (
        uint32 indexed itemID,
        address indexed token,
        uint256 amount
    );

    event ProfitSettled();

    event ProcessorUpdated(address indexed newProcessor);

    modifier onlyPaymentProcessor()
    {
        require(_msgSender() == paymentProcessor, "Not authorized");
        _;
    }

    modifier onlyItemSeller(uint32 itemID)
    {
        require(itemRegistry.seller(itemID) == _msgSender(), "Not item seller");
        _;
    }

    constructor(
        address itemRegistry_,
        address priceTable_,
        address forwarderAddress
    )
        OwnableERC2771Context(msg.sender, forwarderAddress)
    {
        itemRegistry = ItemRegistry(itemRegistry_);
        priceTable = PriceTable(priceTable_);
    }

    function setPaymentProcessor(
        address processor
    )
        external
        onlyOwner
    {
        paymentProcessor = processor;
        emit ProcessorUpdated(processor);
    }

    function accumulate(
        uint32 itemID,
        address token,
        uint256 amount
    )
        external
        onlyPaymentProcessor
    {
        profit[itemID][token] += amount;
        emit ProfitAccumulated(itemID, token, amount);
    }

    function accumulatePendingProfit(
        uint32 itemID,
        address token,
        uint256 amount
    )
        external
        onlyPaymentProcessor
    {
        pendingProfit[itemID][token] += amount;
        wholePendingProfit[token] += amount;

        emit ProfitPending(itemID, token, amount);
    }

    function claim(
        uint32 itemID,
        address token,
        address recipient
    )
        external
        onlyItemSeller(itemID)
    {
        uint256 amount = profit[itemID][token];
        require(amount > 0, "Nothing to claim");

        profit[itemID][token] = 0;
        require(IERC20(token).transfer(recipient, amount), "Transfer failed");

        emit ProfitClaimed(itemID, token, recipient, amount);
    }

    function getBalanceFor(
        uint32 itemID,
        address token
    )
        external
        view
        returns (uint256)
    {
        return profit[itemID][token];
    }

    function getPendingProfit(
        uint32 itemID,
        address token
    )
        external
        view
        returns (uint256)
    {
        return pendingProfit[itemID][token];
    }

    function getWholePendingProfit(address token)
        external
        view
        onlyOwner
        returns (uint256)
    {
        return wholePendingProfit[token];
    }

    function settlePendingProfit(
        address token,
        uint32[] calldata itemIDs
    )
        external
        onlyOwner
    {
        IERC20 tokenContract = IERC20(token);

        uint256 totalAmount = 0;

        for (uint256 i = 0; i < itemIDs.length; i++) {
            uint32 itemID = itemIDs[i];
            uint256 amount = pendingProfit[itemID][token];

            if (amount > 0) {
                profit[itemID][token] += amount;
                totalAmount += amount;
                delete pendingProfit[itemID][token];
            }
        }

        wholePendingProfit[token] -= totalAmount;

        require(
            tokenContract.allowance(owner(), address(this)) >= totalAmount,
            "Token is not allowed"
        );

        require(
            tokenContract.balanceOf(owner()) >= totalAmount,
            "Not enough token"
        );

        require(
            tokenContract.transferFrom(owner(), address(this), totalAmount),
            "Transfer failed"
        );

        emit ProfitSettled();
    }

}
