//SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

library Utils 
{
    
    function fnv1a32 (
        bytes memory input
    )
        internal
        pure
        returns (uint32 hash)
    {
        uint32 prime = 16777619;
        hash = 2166136261;

        for (uint256 i = 0; i < input.length; i++)
        {
            unchecked {
                hash ^= uint32(uint8(input[i]));
                hash *= prime;
            }
        }
    }

}