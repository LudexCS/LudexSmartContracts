//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

abstract contract OwnableERC2771Context is Ownable, ERC2771Context {

    constructor (address owner_, address forwarder) 
        Ownable(owner_)
        ERC2771Context(forwarder)
    {}
     
    function _msgSender () 
        internal 
        view 
        override (Context, ERC2771Context)
        returns (address) 
    {
        return ERC2771Context._msgSender();
    }

    function _msgData ()
        internal
        view
        override (Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        override (Context, ERC2771Context)
        returns (uint256)
    {
        return ERC2771Context._contextSuffixLength();
    }

}