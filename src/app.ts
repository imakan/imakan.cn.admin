import daruk from './daruk.init';
let port = process.env.PORT || 18000;
daruk.run(port, () => {
  daruk.logger.info(`服务已启动，访问 http://localhost:${port} 查看效果`);
});
export default daruk;
