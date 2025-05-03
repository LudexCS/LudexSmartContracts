//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "./OwnableERC2771Context.sol";

/// @title SellerRegistry
/// @author Ludex
/// @notice 
/// A registry contract where sellers manage their list of payment channel tokens
contract SellerRegistry is OwnableERC2771Context {

    mapping (address => bool) public isActiveSeller;
    mapping (address => mapping(address => bool)) public paymentChannels;

    event SellerRegistered (
        address indexed seller, 
        address[] paymentChannels,
        bool isSuccess);

    event PaymentChannelsAdded (
        address indexed seller,
        address[] paymentChannels);

    event PaymentChannelsRemoved (
        address indexed seller,
        address[] paymentChannels);

    constructor (address owner_, address forwarder) 
        OwnableERC2771Context(owner_, forwarder)
    {}

    /// @notice Register a new seller(an address which called this function), 
    /// with a list of ERC-20 tokens as his/her/their/its payment channels
    /// Emits SellerRegistered event
    /// @param paymentChannels_ List of ERC-20 tokens which will be used as 
    /// payment channels
    function registerSeller (
        address[] calldata paymentChannels_
    )
        external
    {
        require(
            paymentChannels_.length != 0,
            "No payment channel is given");
        
        isActiveSeller[_msgSender()] = true;

        for(uint16 i = 0; i < paymentChannels_.length; i ++)
        {
            paymentChannels[_msgSender()][paymentChannels_[i]] = true;
        }

        emit SellerRegistered(_msgSender(), paymentChannels_, true);
    }

    /// @notice
    /// Add new payment channels available for seller's address
    /// Emits PaymentChannelsAdded event
    /// @param paymentChannels_ ERC-20 tokens' address list to be added
    function addPaymentChannels (
        address[] calldata paymentChannels_
    )
        external
    {
        require (isActiveSeller[_msgSender()], "Seller not registered");

        for (uint16 i = 0; i < paymentChannels_.length; i ++)
        {
            if (paymentChannels[_msgSender()][paymentChannels_[i]])
                continue;
            
            paymentChannels[_msgSender()][paymentChannels_[i]] = true;
        }

        emit PaymentChannelsAdded(_msgSender(), paymentChannels_);
    }

    /// @notice 
    /// Remove some or all of payment channels 
    /// which were available for the address that called this function
    /// Emits PaymentChannelsRemoved event
    /// @param paymentChannels_ ERC-20 tokens' address list to be disabled
    function removePaymentChannels (
        address[] calldata paymentChannels_
    )
        external
    {
        require (isActiveSeller[_msgSender()], "Seller not registered");

        for (uint16 i = 0; i < paymentChannels_.length; i ++)
        {
            if (paymentChannels[_msgSender()][paymentChannels_[i]])
            {
                delete paymentChannels[_msgSender()][paymentChannels_[i]];
            }
        }

        emit PaymentChannelsRemoved(_msgSender(), paymentChannels_);
    }

}