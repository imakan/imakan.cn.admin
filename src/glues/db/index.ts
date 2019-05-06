/*
 * @Author: makan
 * @Date: 2019-03-11 16:39:46
 * @Last Modified by: makan
 * @Last Modified time: 2019-05-05 09:49:10
 */
import glob = require('glob');
import path = require('path');
import typeorm = require('typeorm');
import config from '../../config';
let createConnection = typeorm.createConnection;
let getRepository = typeorm.getRepository;

let modelPath =
  process.env.NODE_ENV === 'dev'
    ? path.resolve(process.cwd(), './src/model/*.*')
    : path.resolve(process.cwd(), './dist/src/model/*.*');
let entities = glob.sync(modelPath).filter((fileName: string) => {
  let ext = fileName.split('.')[fileName.split('.').length - 1];
  return fileName.indexOf('index') === -1 && ext !== 'map';
});

let processConnect = () => {
  createConnection(config().mysql(entities))
    .then(() => {
      console.log('数据库连接成功!!!');
    })
    .catch((error: Error) => {
      console.log(error);
      setTimeout(() => {
        processConnect();
      }, 3000);
    });
};
processConnect();
export default () => {
  return (tableName: any) => {
    return getRepository(tableName).createQueryBuilder();
  };
};
