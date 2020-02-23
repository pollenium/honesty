pragma solidity ^0.5.0;

import { Engine as AlchemillaEngine } from 'alchemilla/Engine.sol';
import { ERC20 } from 'alchemilla/openzeppelin/token/ERC20/ERC20.sol';
import { Ownable } from 'alchemilla/openzeppelin/ownership/Ownable.sol';

contract Bop is Ownable, ERC20 {

  address public alchemillaEngine;

  constructor(address _alchemillaEngine) public {
    alchemillaEngine = _alchemillaEngine;
    _approve(address(this), _alchemillaEngine, uint256(-1));
  }
  function mintAndDepositToAlchemilla(address holder, uint256 amount) public onlyOwner() {
    _mint(address(this), amount);
    AlchemillaEngine(alchemillaEngine).depositViaNative(holder, address(this), amount);
  }
}
