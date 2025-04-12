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

    constructor (address owner_, address forwarder) 
        OwnableERC2771Context(owner_, forwarder)
    {}

    /// @notice Register a new seller(an address which called this function), 
    /// with a list of ERC-20 tokens as his/her/their/its payment channels
    /// @param paymentChannels_ List of ERC-20 tokens which will be used as 
    /// payment channels
    function registerSeller (
        address[] calldata paymentChannels_
    )
        external
        returns (bool isSuccess)
    {
        require(
            paymentChannels_.length != 0,
            "No payment channel is given");
        
        isActiveSeller[_msgSender()] = true;

        for(uint16 i = 0; i < paymentChannels_.length; i ++)
        {
            paymentChannels[_msgSender()][paymentChannels_[i]] = true;
        }

        return true;
    }

    /// @notice
    /// Add new payment channels available for seller's address
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
    }

    /// @notice 
    /// Remove some or all of payment channels 
    /// which were available for the address that called this function
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
    }

}