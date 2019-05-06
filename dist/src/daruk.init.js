"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daruk_1 = require("daruk");
const prod = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production';
const options = {
    rootPath: __dirname,
    alertAccounts: ['imakan520@gmail.com'],
    sinaWatch: {
        enable: true,
        accounts: ['makan']
    },
    debug: !prod
};
exports.default = new daruk_1.Daruk('admin', options);
//# sourceMappingURL=daruk.init.js.map