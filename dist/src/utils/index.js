"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let formatTime = (time, fmt) => {
    let data = new Date(time || new Date());
    let o = {
        'M+': data.getMonth() + 1,
        'd+': data.getDate(),
        'h+': data.getHours() % 12 === 0 ? 12 : data.getHours() % 12,
        'H+': data.getHours(),
        'm+': data.getMinutes(),
        's+': data.getSeconds(),
        'q+': Math.floor((data.getMonth() + 3) / 3),
        S: data.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};
exports.default = () => {
    return {
        formatTime
    };
};
//# sourceMappingURL=index.js.map