"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_default_1 = require("./config.default");
const env = process.env.NODE_ENV || 'dev';
const envConfig = require(`./config.${env}`).default;
exports.default = () => {
    return Object.assign({}, config_default_1.default, envConfig);
};
//# sourceMappingURL=index.js.map