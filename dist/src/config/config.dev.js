"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mysql: (entities) => {
        return {
            type: 'mysql',
            host: '39.105.204.243',
            port: 3306,
            username: 'root',
            password: '921027',
            database: 'imakan.cn',
            entities,
            synchronize: true,
            logging: false
        };
    }
};
//# sourceMappingURL=config.dev.js.map