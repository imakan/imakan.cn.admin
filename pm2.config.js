module.exports = {
  apps: [
    {
      name: 'admin',
      script: './dist/src/app.js',
      instances: '1',
      vizion: true,
      env: {
        PORT: '18000',
        NODE_ENV: 'prod',
        DEBUG: false
      }
    }
  ]
};
