"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var keypairs_1 = require("./lib/keypairs");
var gaillardia_1 = require("./lib/gaillardia");
var pollenium_toadflax_1 = require("pollenium-toadflax");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var __1 = require("../");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var e18 = new pollenium_buttercup_1.Uint256(10).opPow(18);
var totalSupply = e18.opMul(100);
var bopAmount = 10;
var mintCost = e18.opMul(bopAmount);
var bopCashout = 3;
var provider = gaillardia_1.gaillardia.ethersWeb3Provider;
var user = keypairs_1.keypairs.user.getAddress();
var userWallet = gaillardia_1.gaillardia.genWallet(keypairs_1.keypairs.user.privateKey);
var engineAdmin = keypairs_1.keypairs.engineAdmin.getAddress();
var engineAdminWallet = gaillardia_1.gaillardia.genWallet(keypairs_1.keypairs.engineAdmin.privateKey);
var overseerAdmin = keypairs_1.keypairs.overseerAdmin.getAddress();
var overseerAdminWallet = gaillardia_1.gaillardia.genWallet(keypairs_1.keypairs.overseerAdmin.privateKey);
var dai;
var daiReader;
var engine;
var engineReader;
var overseer;
var overseerReader;
var bopAgree;
var bopDisagree;
test("user should deploy dai with " + totalSupply.opDiv(e18).toNumber() + "e18 totalSupply", function () { return __awaiter(void 0, void 0, void 0, function () {
    var address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_toadflax_1.TokenDeployer({
                    signer: userWallet
                }).deploy({ totalSupply: totalSupply })];
            case 1:
                address = (_a.sent()).address;
                dai = address;
                daiReader = new pollenium_toadflax_1.TokenReader({ provider: provider, address: address });
                return [2 /*return*/];
        }
    });
}); });
test('should deploy engine', function () { return __awaiter(void 0, void 0, void 0, function () {
    var address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_alchemilla_1.EngineDeployer({
                    signer: engineAdminWallet
                }).deploy()];
            case 1:
                address = (_a.sent()).address;
                engine = address;
                engineReader = new pollenium_alchemilla_1.EngineReader({ provider: provider, address: address });
                return [2 /*return*/];
        }
    });
}); });
test('increase allowance', function () { return __awaiter(void 0, void 0, void 0, function () {
    var allowance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_toadflax_1.TokenWriter({
                    signer: userWallet,
                    address: dai
                }).setAllowance({
                    spender: engine,
                    amount: totalSupply
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, daiReader.fetchAllowance({
                        holder: user,
                        spender: engine
                    })];
            case 2:
                allowance = _a.sent();
                expect(allowance.toNumberString(10)).toEqual(totalSupply.toNumberString(10));
                return [2 /*return*/];
        }
    });
}); });
test('deposit dai', function () { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_alchemilla_1.EngineWriter({
                    signer: userWallet,
                    address: engine
                }).depositViaNative({
                    to: user,
                    token: dai,
                    amount: totalSupply
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, engineReader.fetchBalance({
                        holder: user,
                        token: dai
                    })];
            case 2:
                balance = _a.sent();
                expect(balance.toNumberString(10)).toEqual(totalSupply.toNumberString(10));
                return [2 /*return*/];
        }
    });
}); });
test('overseerAdminWallet should deploy overseer', function () { return __awaiter(void 0, void 0, void 0, function () {
    var address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new __1.OverseerDeployer({
                    signer: overseerAdminWallet
                }).deploy({
                    alchemillaEngine: engine,
                    dai: dai
                })];
            case 1:
                address = (_a.sent()).address;
                overseer = address;
                overseerReader = new __1.OverseerReader({ provider: provider, address: address });
                return [4 /*yield*/, overseerReader.fetchBopAgree()];
            case 2:
                bopAgree = _a.sent();
                return [4 /*yield*/, overseerReader.fetchBopDisagree()];
            case 3:
                bopDisagree = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("user should fail to withdrawAndNotifyViaNative " + mintCost.opDiv(e18).toNumber() + "e18 + 1 dai to overseer", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, new pollenium_alchemilla_1.EngineWriter({
                        signer: userWallet,
                        address: engine
                    }).withdrawAndNotifyViaNative({
                        to: overseer,
                        token: dai,
                        amount: mintCost.opAdd(1)
                    })["catch"](function (error) {
                        expect(error.message).toMatch('Overseer/handleWithdrawNotification/invalid-amount');
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("user should withdrawAndNotifyViaNative " + mintCost.opDiv(e18).toNumber() + "e18 dai to overseer", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_alchemilla_1.EngineWriter({
                    signer: userWallet,
                    address: engine
                }).withdrawAndNotifyViaNative({
                    to: overseer,
                    token: dai,
                    amount: mintCost
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("oveerseer should have balance of " + mintCost.opDiv(e18).toNumber() + "e18 dai", function () { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, daiReader.fetchBalance(overseer)];
            case 1:
                balance = _a.sent();
                expect(balance.toNumberString(10)).toBe(mintCost.toNumberString(10));
                return [2 /*return*/];
        }
    });
}); });
test("user should have engine balance of " + totalSupply.opSub(mintCost).opDiv(e18).toNumber() + "e18 dai", function () { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchBalance({
                    holder: user,
                    token: dai
                })];
            case 1:
                balance = _a.sent();
                expect(balance.toNumberString(10)).toEqual(totalSupply.opSub(mintCost).toNumberString(10));
                return [2 /*return*/];
        }
    });
}); });
test("user should have engine balance of " + bopAmount + " bopAgree/bopDisagree", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bopAgreeBalance, bopDisagreeBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchBalance({
                    holder: user,
                    token: bopAgree
                })];
            case 1:
                bopAgreeBalance = _a.sent();
                return [4 /*yield*/, engineReader.fetchBalance({
                        holder: user,
                        token: bopDisagree
                    })];
            case 2:
                bopDisagreeBalance = _a.sent();
                expect(bopAgreeBalance.toNumber()).toEqual(bopAmount);
                expect(bopDisagreeBalance.toNumber()).toEqual(bopAmount);
                return [2 /*return*/];
        }
    });
}); });
test('overseerAdmin should set overseer status to SettledAgree', function () { return __awaiter(void 0, void 0, void 0, function () {
    var statusBefore, statusAfter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, overseerReader.fetchStatus()];
            case 1:
                statusBefore = _a.sent();
                expect(statusBefore).toBe(__1.OverseerStatus.DEFAULT);
                return [4 /*yield*/, new __1.OverseerWriter({
                        signer: overseerAdminWallet,
                        address: overseer
                    }).setStatus(__1.OverseerStatus.SETTLED_AGREE)];
            case 2:
                _a.sent();
                return [4 /*yield*/, overseerReader.fetchStatus()];
            case 3:
                statusAfter = _a.sent();
                expect(statusAfter).toBe(__1.OverseerStatus.SETTLED_AGREE);
                return [2 /*return*/];
        }
    });
}); });
test('user should fail to cash out bopDisagree', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, new pollenium_alchemilla_1.EngineWriter({
                        signer: userWallet,
                        address: engine
                    }).withdrawAndNotifyViaNative({
                        to: overseer,
                        token: bopDisagree,
                        amount: bopAmount
                    })["catch"](function (error) {
                        expect(error.message).toMatch('Overseer/handleWithdrawNotification/invalid-status/disagree');
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("should cash out " + bopCashout + " bopAgree", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new pollenium_alchemilla_1.EngineWriter({
                    signer: userWallet,
                    address: engine
                }).withdrawAndNotifyViaNative({
                    to: overseer,
                    token: bopAgree,
                    amount: bopCashout
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("user should have engine balance of " + (bopAmount - bopCashout) + " bopAgree", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bopAgreeBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchBalance({
                    holder: user,
                    token: bopAgree
                })];
            case 1:
                bopAgreeBalance = _a.sent();
                expect(bopAgreeBalance.toNumber()).toEqual(bopAmount - bopCashout);
                return [2 /*return*/];
        }
    });
}); });
test("user should have engine balance of " + totalSupply.opSub(mintCost).opAdd(e18.opMul(bopCashout)).opDiv(e18).toNumber() + "e18 dai", function () { return __awaiter(void 0, void 0, void 0, function () {
    var daiBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, engineReader.fetchBalance({
                    holder: user,
                    token: dai
                })];
            case 1:
                daiBalance = _a.sent();
                expect(daiBalance.toNumberString(10)).toEqual(totalSupply.opSub(mintCost).opAdd(e18.opMul(bopCashout)).toNumberString(10));
                return [2 /*return*/];
        }
    });
}); });
