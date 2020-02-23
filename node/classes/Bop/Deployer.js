"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var contractOutputs_1 = require("../../contractOutputs");
var pollenium_clover_1 = require("pollenium-clover");
var OverseerDeployer = /** @class */ (function (_super) {
    __extends(OverseerDeployer, _super);
    function OverseerDeployer(struct) {
        return _super.call(this, __assign(__assign(__assign({}, contractOutputs_1.overseerOutput), struct), { deployTransformer: function (alchemillaEngine) {
                return [alchemillaEngine.uu.toPhex()];
            } })) || this;
    }
    return OverseerDeployer;
}(pollenium_clover_1.ContractDeployer));
exports.OverseerDeployer = OverseerDeployer;
