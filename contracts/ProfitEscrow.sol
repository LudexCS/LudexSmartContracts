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
    mapping(uint32 => mapping(address => uint256)) private escrow;

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
        escrow[itemID][token] += amount;
        emit ProfitAccumulated(itemID, token, amount);
    }

    function claim(
        uint32 itemID,
        address token,
        address recipient
    )
        external
        onlyItemSeller(itemID)
    {
        uint256 amount = escrow[itemID][token];
        require(amount > 0, "Nothing to claim");

        escrow[itemID][token] = 0;
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
        return escrow[itemID][token];
    }
}
