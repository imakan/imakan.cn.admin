"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (daruk) => {
    return async (ctx, next) => {
        try {
            ctx.error = (code, message) => {
                if (typeof code === 'string') {
                    message = code;
                    code = 500;
                }
                ctx.throw(code || 500, message);
            };
            await next();
        }
        catch (e) {
            let status = e.status || 500;
            let message = e.message;
            daruk.logger.info(message);
            ctx.body = { status, message };
        }
    };
};
//# sourceMappingURL=handle-error.js.map