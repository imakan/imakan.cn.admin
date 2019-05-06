import { Daruk } from 'daruk';

// @ts-ignore
const prod = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production';

const options = {
  rootPath: __dirname,
  alertAccounts: ['imakan520@gmail.com'],
  sinaWatch: {
    enable: true,
    // sina-watch提醒账号，填写邮箱前缀
    accounts: ['makan']
  },
  debug: !prod
};

export default new Daruk('admin', options);
