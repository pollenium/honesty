pragma solidity ^0.5.0;

import { Engine as AlchemillaEngine } from 'alchemilla/Engine.sol';
import { WithdrawNotificationHandlerInterface } from 'alchemilla/WithdrawNotificationHandler.interface.sol';
import { ERC20 } from 'alchemilla/openzeppelin/token/ERC20/ERC20.sol';
import { Ownable } from 'alchemilla/openzeppelin/ownership/Ownable.sol';
import { Bop } from './Bop.sol';

contract Overseer is Ownable, WithdrawNotificationHandlerInterface {

  enum Status {
    Default,
    SettledAgree,
    SettledDisagree
  }

  Status public status;

  address public alchemillaEngine;
  address public dai;

  address public bopAgree;
  address public bopDisagree;

  constructor(address _alchemillaEngine, address _dai) public {

    alchemillaEngine = _alchemillaEngine;
    dai = _dai;

    ERC20(_dai).approve(_alchemillaEngine, uint256(-1));

    bopAgree = address(new Bop(_alchemillaEngine));
    bopDisagree = address(new Bop(_alchemillaEngine));

  }

  function setStatus(Status _status) public onlyOwner() {
    require(status == Status.Default);
    status = _status;
  }

  function handleWithdrawNotification(address from, address token, uint256 amount) public {
    require(msg.sender == alchemillaEngine);
    if (token == dai) {
      require(amount % 1e18 == 0, 'Overseer/handleWithdrawNotification/invalid-amount');
      uint256 bopAmount = amount / 1e18;
      Bop(bopAgree).mintAndDepositToAlchemilla(from, bopAmount);
      Bop(bopDisagree).mintAndDepositToAlchemilla(from, bopAmount);
    } else if (token == bopAgree) {
      require(status == Status.SettledAgree, 'Overseer/handleWithdrawNotification/invalid-status/agree');
      AlchemillaEngine(alchemillaEngine).depositViaNative(from, dai, amount * 1e18);
    } else if (token == bopDisagree) {
      require(status == Status.SettledDisagree, 'Overseer/handleWithdrawNotification/invalid-status/disagree');
      AlchemillaEngine(alchemillaEngine).depositViaNative(from, dai, amount * 1e18);
    } else {
      revert('Overseer/handleWithdrawNotification/invalid-token');
    }
  }

}
