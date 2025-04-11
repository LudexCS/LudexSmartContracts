//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

import "./PriceTable.sol";

contract Store is Ownable, ERC2771Context 
{

    struct FeeRateLogEntry {
        uint256 timestamp;
        uint16 feeRate;
    }

    FeeRateLogEntry[] feeRateLog;
    PriceTable priceTable;

    constructor (
        address forwarderAddress,
        uint16 initialFeeRate
    ) 
        ERC2771Context(forwarderAddress)
        Ownable(msg.sender)
    {
        feeRateLog.push(FeeRateLogEntry(block.timestamp, initialFeeRate));
        priceTable = new PriceTable(msg.sender, address(this));
    }

    function purchaseItem (
        uint32 itemID,
        address token
    )
        external
        returns (uint256 purchaseID)
    {

    }

    function startItemSale (
        string calldata itemName,
        uint256 usdPrice,
        uint16 revenueShare,
        uint32[] parentItems 
    )
        external
    {
        
    }

    function changeFeeRate(
        uint16 newFeeRate
    )
        external
        onlyOwner
        returns (uint16 prevFeeRate)
    {
        
    }

}