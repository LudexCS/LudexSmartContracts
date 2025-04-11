//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

contract SellerRegistry
{
    mapping (address => address[]) paymentChannels;

    function isActiveSeller (
        address seller
    )
        public
        view
        returns (bool isActive)
    {

    }   

    function registerSeller (
        address seller,
        address[] calldata paymentChannels_
    )
        external
        returns (bool isSuccess)
    {
        
    }

    function addPaymentChannels (
        address seller,
        address[] calldata paymentChannels_
    )
        external
        returns (bool isSucess)
    {

    }

    function removePaymentChannels (
        address seller,
        address[] calldata paymentChannels_
    )
        external
        returns (bool isSuccess)
    {

    }

}