"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function default_1(daruk) {
    const { rootPath } = daruk.options;
    const darukConfig = {};
    darukConfig.middlewareOrder = [
        'handle-error',
        'koa-body',
        'koa-favicon',
        'koa-static',
        'koa-compress',
        'koa-ejs'
    ];
    darukConfig.middleware = {
        'koa-favicon': (mid) => {
            return mid(`${rootPath}/public/favicon.ico`);
        },
        'koa-body': (mid) => {
            return mid({
                multipart: true
            });
        },
        'koa-static': (mid) => {
            return mid(path.join(rootPath, './public'));
        },
        'koa-compress': (mid) => {
            return mid({
                threshold: 1024,
                flush: require('zlib').Z_SYNC_FLUSH
            });
        },
        'koa-ejs': (mid) => {
            mid(daruk, {
                root: path.join(rootPath, './view'),
                viewExt: 'html',
                cache: true,
                debug: false
            });
            return false;
        }
    };
    darukConfig.util = {};
    darukConfig.timer = {};
    return darukConfig;
}
exports.default = default_1;
//# sourceMappingURL=daruk.config.js.map