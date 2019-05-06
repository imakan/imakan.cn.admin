export default {
  mysql: (entities: any[]) => {
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
