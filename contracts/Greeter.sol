//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "hardhat/console.sol";

contract Greeter is ERC20Permit {

    constructor() ERC20("jej", "2") ERC20Permit("jej") {
        _mint(msg.sender, 1000e18);
    }
}
