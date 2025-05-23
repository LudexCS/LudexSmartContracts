// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./ItemRegistry.sol";
import "./ProfitEscrow.sol";
import "./PaymentProcessor.sol";
import "./Store.sol";

contract SellerProxy is Ownable {

    ItemRegistry private itemRegistry;
    ProfitEscrow private profitEscrow;
    PriceTable private priceTable;

    mapping(uint32 => uint32) seller;
    mapping(uint32 => uint32[]) itemsOfSeller;

    event ItemRegistrationDelegated (
        uint32 indexed itemID,
        uint32 indexed sellerID,
        uint32[] itemShareIDs
    );

    event ProfitClaimDelegated (
        address indexed token,
        address indexed recipient,
        uint32 indexed itemID
    );

    event SellerRightClaimed (
        uint32 indexed sellerID,
        address indexed sellerAddress,
        uint32[] items
    );

    constructor (
        address paymentProcessor
    ) 
        Ownable(msg.sender)   
    {
        PaymentProcessor payment = PaymentProcessor(paymentProcessor);
        itemRegistry = payment.itemRegistry();
        profitEscrow = payment.profitEscrow();
        priceTable = payment.priceTable();
    }

    modifier onlyItemSellerID (uint32 itemID, uint32 sellerID)
    {
        require(
            seller[itemID] == sellerID,
            "Not item seller");
        _;
    }

    function registerItem (
        bytes32 itemNameHash,
        uint32 sellerID,
        uint32[] calldata revenueSharers,
        uint256 usdPrice,
        uint32[] calldata shareTerms,
        uint16[] calldata shares
    )
        external
        onlyOwner
    {
        (uint32 itemID, uint32[] memory itemShareIDs) = 
            itemRegistry.registerItem(
                itemNameHash, 
                address(this), 
                revenueSharers,
                usdPrice,
                shareTerms,
                shares
            );
        
        seller[itemID] = sellerID;
        itemsOfSeller[sellerID].push(itemID);

        for (uint16 i = 0; i < itemShareIDs.length; i ++)
        {
            seller[itemShareIDs[i]] = sellerID;
            itemsOfSeller[sellerID].push(itemShareIDs[i]);
        }

        emit ItemRegistrationDelegated(
            itemID,
            sellerID,
            itemShareIDs
        ); 
    }

    function getItemsOfSeller(
        uint32 sellerID
    )
        public
        view
        returns (uint32[] memory)
    {
        uint32 length = uint32(itemsOfSeller[sellerID].length);
        uint32[] memory items = new uint32[](length);

        for (uint32 i = 0; i < length; i++)
        {
            items[i] = itemsOfSeller[sellerID][i];
        }

        return items;
    }

    function claimProfit(
        uint32 sellerID,
        uint32 itemID,
        address token,
        address recipient
    )
        external
        onlyOwner
        onlyItemSellerID(itemID, sellerID)
    {
        profitEscrow.claim(itemID, token, recipient);
    
        emit ProfitClaimDelegated(
            token,
            recipient,
            itemID
        );
    }

    function claimSellerRight(
        uint32 sellerID,
        uint32[] calldata items,
        address sellerAddress
    )
        external
        onlyOwner
    {
        for (uint32 i = 0; i < items.length; i ++)
        {
            require(
                seller[items[i]] == sellerID,
                "Not item seller");

            itemRegistry.transferSellerRight(items[i], sellerAddress);
        }

        emit SellerRightClaimed(
            sellerID,
            sellerAddress,
            items);
    }

    function changeItemPrice(
        uint32 sellerID,
        uint32 itemID,
        uint256 newUsdPrice
    )
        external
        onlyOwner
        onlyItemSellerID(itemID, sellerID)
    {
        priceTable.changeItemPrice(itemID, newUsdPrice);
    }

    function startDiscount(
        uint32 sellerID,
        uint32 itemID,
        uint256 discountPrice,
        uint256 endTime
    )
        external
        onlyOwner
        onlyItemSellerID(itemID, sellerID)
    {
        priceTable.startDiscount(itemID, discountPrice, endTime);
    }

    function changeRevShare(
        uint32 sellerID,
        uint32 itemID,
        uint16 newSharePermyriad
    )
        external
        onlyOwner
        onlyItemSellerID(itemID, sellerID)
    {
        priceTable.changeRevShare(itemID, newSharePermyriad);
    }

    function startRevShareReductionEvent(
        uint32 sellerID,
        uint32 itemID,
        uint16 reducedShare,
        uint256 endTime
    )
        external
        onlyOwner
        onlyItemSellerID(itemID, sellerID)
    {
        priceTable.startRevShareReductionEvent(
            itemID,
            reducedShare,
            endTime);
    }
}