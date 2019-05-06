"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daruk_init_1 = require("./daruk.init");
let port = process.env.PORT || 18000;
daruk_init_1.default.run(port, () => {
    daruk_init_1.default.logger.info(`服务已启动，访问 http://localhost:${port} 查看效果`);
});
exports.default = daruk_init_1.default;
//# sourceMappingURL=app.js.map