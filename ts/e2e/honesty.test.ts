import { keypairs } from './lib/keypairs'
import { gaillardia } from './lib/gaillardia'
import { TokenDeployer, TokenReader, TokenWriter } from 'pollenium-toadflax'
import { EngineDeployer, EngineReader, EngineWriter } from 'pollenium-alchemilla'
import { OverseerDeployer, OverseerReader, OverseerWriter, OverseerStatus } from '../'
import { Address, Uint256 } from 'pollenium-buttercup'

const e18 = new Uint256(10).opPow(18)
const totalSupply = e18.opMul(100)
const bopAmount = 10
const mintCost = e18.opMul(bopAmount)
const bopCashout = 3

const provider = gaillardia.ethersWeb3Provider

const user = keypairs.user.getAddress()
const userWallet = gaillardia.genWallet(keypairs.user.privateKey)

const engineAdmin = keypairs.engineAdmin.getAddress()
const engineAdminWallet = gaillardia.genWallet(keypairs.engineAdmin.privateKey)

const overseerAdmin = keypairs.overseerAdmin.getAddress()
const overseerAdminWallet = gaillardia.genWallet(keypairs.overseerAdmin.privateKey)

let dai: Address
let daiReader: TokenReader

let engine: Address
let engineReader: EngineReader

let overseer: Address
let overseerReader: OverseerReader

let bopAgree: Address

let bopDisagree: Address

test(`user should deploy dai with ${totalSupply.opDiv(e18).toNumber()}e18 totalSupply`, async () => {
  const { address } = await new TokenDeployer({
    signer: userWallet
  }).deploy({ totalSupply })

  dai = address
  daiReader = new TokenReader({ provider, address })
})

test('should deploy engine', async () => {
  const { address } = await new EngineDeployer({
    signer: engineAdminWallet
  }).deploy()

  engine = address
  engineReader = new EngineReader({ provider, address })
})

test('increase allowance', async () => {
  await new TokenWriter({
    signer: userWallet,
    address: dai
  }).setAllowance({
    spender: engine,
    amount: totalSupply
  })

  const allowance = await daiReader.fetchAllowance({
    holder: user,
    spender: engine
  })

  expect(allowance.toNumberString(10)).toEqual(totalSupply.toNumberString(10))
})

test('deposit dai', async () => {
  await new EngineWriter({
    signer: userWallet,
    address: engine
  }).depositViaNative({
    to: user,
    token: dai,
    amount: totalSupply
  })

  const balance = await engineReader.fetchBalance({
    holder: user,
    token: dai
  })

  expect(balance.toNumberString(10)).toEqual(totalSupply.toNumberString(10))
})

test('overseerAdminWallet should deploy overseer', async () => {
  const { address } = await new OverseerDeployer({
    signer: overseerAdminWallet
  }).deploy({
    alchemillaEngine: engine,
    dai: dai
  })
  overseer = address
  overseerReader = new OverseerReader({ provider, address })

  bopAgree = await overseerReader.fetchBopAgree()
  bopDisagree = await overseerReader.fetchBopDisagree()
})

test(`user should fail to withdrawAndNotifyViaNative ${mintCost.opDiv(e18).toNumber()}e18 + 1 dai to overseer`, async () => {
  expect.assertions(1)
  await new EngineWriter({
    signer: userWallet,
    address: engine
  }).withdrawAndNotifyViaNative({
    to: overseer,
    token: dai,
    amount: mintCost.opAdd(1)
  }).catch((error) => {
    expect(error.message).toMatch('Overseer/handleWithdrawNotification/invalid-amount')
  })
})

test(`user should withdrawAndNotifyViaNative ${mintCost.opDiv(e18).toNumber()}e18 dai to overseer`, async () => {
  await new EngineWriter({
    signer: userWallet,
    address: engine
  }).withdrawAndNotifyViaNative({
    to: overseer,
    token: dai,
    amount: mintCost
  })
})

test(`oveerseer should have balance of ${mintCost.opDiv(e18).toNumber()}e18 dai`, async () => {
  const balance = await daiReader.fetchBalance(overseer)
  expect(balance.toNumberString(10)).toBe(mintCost.toNumberString(10))
})

test(`user should have engine balance of ${totalSupply.opSub(mintCost).opDiv(e18).toNumber()}e18 dai`, async () => {
  const balance = await engineReader.fetchBalance({
    holder: user,
    token: dai
  })

  expect(balance.toNumberString(10)).toEqual(totalSupply.opSub(mintCost).toNumberString(10))
})

test(`user should have engine balance of ${bopAmount} bopAgree/bopDisagree`, async () => {
  const bopAgreeBalance = await engineReader.fetchBalance({
    holder: user,
    token: bopAgree
  })

  const bopDisagreeBalance = await engineReader.fetchBalance({
    holder: user,
    token: bopDisagree
  })

  expect(bopAgreeBalance.toNumber()).toEqual(bopAmount)
  expect(bopDisagreeBalance.toNumber()).toEqual(bopAmount)
})

test('overseerAdmin should set overseer status to SettledAgree', async () => {

  const statusBefore = await overseerReader.fetchStatus()
  expect(statusBefore).toBe(OverseerStatus.DEFAULT)

  await new OverseerWriter({
    signer: overseerAdminWallet,
    address: overseer
  }).setStatus(OverseerStatus.SETTLED_AGREE)

  const statusAfter = await overseerReader.fetchStatus()
  expect(statusAfter).toBe(OverseerStatus.SETTLED_AGREE)
})

test('user should fail to cash out bopDisagree', async () => {
  expect.assertions(1)
  await new EngineWriter({
    signer: userWallet,
    address: engine
  }).withdrawAndNotifyViaNative({
    to: overseer,
    token: bopDisagree,
    amount: bopAmount
  }).catch((error) => {
    expect(error.message).toMatch('Overseer/handleWithdrawNotification/invalid-status/disagree')
  })
})

test(`should cash out ${bopCashout} bopAgree`, async () => {
  await new EngineWriter({
    signer: userWallet,
    address: engine
  }).withdrawAndNotifyViaNative({
    to: overseer,
    token: bopAgree,
    amount: bopCashout
  })
})

test(`user should have engine balance of ${bopAmount - bopCashout} bopAgree`, async () => {
  const bopAgreeBalance = await engineReader.fetchBalance({
    holder: user,
    token: bopAgree
  })

  expect(bopAgreeBalance.toNumber()).toEqual(bopAmount - bopCashout)
})

test(`user should have engine balance of ${totalSupply.opSub(mintCost).opAdd(e18.opMul(bopCashout)).opDiv(e18).toNumber()}e18 dai`, async () => {
  const daiBalance = await engineReader.fetchBalance({
    holder: user,
    token: dai
  })

  expect(daiBalance.toNumberString(10)).toEqual(totalSupply.opSub(mintCost).opAdd(e18.opMul(bopCashout)).toNumberString(10))
})
