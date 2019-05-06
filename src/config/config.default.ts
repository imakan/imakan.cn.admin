export default {
  keys: Buffer.from('app-log', 'utf8'),
  session: {
    key: 'admin',
    maxAge: 24 * 60 * 60 * 1000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true
  }
};
