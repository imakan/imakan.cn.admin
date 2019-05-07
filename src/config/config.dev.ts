export default {
  mysql: (entities: any[]) => {
    return {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'mk921027',
      database: 'imakan.cn',
      entities,
      synchronize: true,
      logging: false
    };
  }
};
