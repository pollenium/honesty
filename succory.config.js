const path = require('path')

const zeppelinDir = path.dirname(require.resolve('openzeppelin-solidity/package.json'))
const alchemillaDir = path.dirname(require.resolve('pollenium-alchemilla/package.json'))

const alchemillaContractsDir = `${alchemillaDir}/contracts`
const zeppelinContractsDir = `${zeppelinDir}/contracts`
const honestyContractsDir = `${__dirname}/contracts`

const sources = {

  'alchemilla/openzeppelin/math/SafeMath.sol': `${zeppelinContractsDir}/math/SafeMath.sol`,
  'alchemilla/openzeppelin/utils/Address.sol': `${zeppelinContractsDir}/utils/Address.sol`,
  'alchemilla/openzeppelin/introspection/IERC165.sol': `${zeppelinContractsDir}/introspection/IERC165.sol`,
  'alchemilla/openzeppelin/introspection/ERC165.sol': `${zeppelinContractsDir}/introspection/ERC165.sol`,
  'alchemilla/openzeppelin/ownership/Ownable.sol': `${zeppelinContractsDir}/ownership/Ownable.sol`,
  'alchemilla/openzeppelin/GSN/Context.sol': `${zeppelinContractsDir}/GSN/Context.sol`,
  'alchemilla/openzeppelin/token/ERC20/IERC20.sol': `${zeppelinContractsDir}/token/ERC20/IERC20.sol`,
  'alchemilla/openzeppelin/token/ERC20/ERC20.sol': `${zeppelinContractsDir}/token/ERC20/ERC20.sol`,

  'alchemilla/ExecutorOracle.interface.sol': `${alchemillaContractsDir}/ExecutorOracle.interface.sol`,
  'alchemilla/WithdrawNotificationHandler.interface.sol': `${alchemillaContractsDir}/WithdrawNotificationHandler.interface.sol`,
  'alchemilla/MonarchicExecutorOracle.sol': `${alchemillaContractsDir}/MonarchicExecutorOracle.sol`,
  'alchemilla/Engine.sol': `${alchemillaContractsDir}/Engine.sol`,

  'Overseer.sol': `${honestyContractsDir}/Overseer.sol`,
  'Bop.sol': `${honestyContractsDir}/Bop.sol`,
}

module.exports = {
  sources,
  outs: [{
    constName: 'overseerOutput',
    fileName: 'Overseer.sol',
    contractName: 'Overseer'
  },{
    constName: 'bopOutput',
    fileName: 'Bop.sol',
    contractName: 'Bop'
  }],
  tsPath: './ts/contractOutputs.ts'
}
