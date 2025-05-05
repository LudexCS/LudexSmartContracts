// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MockUSDC is ERC20Permit {
    uint256 public constant INITIAL_AMOUNT = 1_000_000 * 10 ** 6; // 1 million USDC

    constructor(address[] memory recipients) 
        ERC20("MockUSDC", "USDC")
        ERC20Permit("MockUSDC") 
    {
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], INITIAL_AMOUNT);
        }
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
