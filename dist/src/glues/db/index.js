"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path = require("path");
const typeorm = require("typeorm");
const config_1 = require("../../config");
let createConnection = typeorm.createConnection;
let getRepository = typeorm.getRepository;
let modelPath = process.env.NODE_ENV === 'dev'
    ? path.resolve(process.cwd(), './src/model/*.*')
    : path.resolve(process.cwd(), './dist/src/model/*.*');
let entities = glob.sync(modelPath).filter((fileName) => {
    let ext = fileName.split('.')[fileName.split('.').length - 1];
    return fileName.indexOf('index') === -1 && ext !== 'map';
});
let processConnect = () => {
    createConnection(config_1.default().mysql(entities))
        .then(() => {
        console.log('数据库连接成功!!!');
    })
        .catch((error) => {
        console.log(error);
        setTimeout(() => {
            processConnect();
        }, 3000);
    });
};
processConnect();
exports.default = () => {
    return (tableName) => {
        return getRepository(tableName).createQueryBuilder();
    };
};
//# sourceMappingURL=index.js.map