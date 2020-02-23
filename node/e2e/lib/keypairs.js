"use strict";
exports.__esModule = true;
var pollenium_ilex_1 = require("pollenium-ilex");
exports.keypairs = {
    engineAdmin: pollenium_ilex_1.Keypair.generate(),
    overseerAdmin: pollenium_ilex_1.Keypair.generate(),
    user: pollenium_ilex_1.Keypair.generate()
};
