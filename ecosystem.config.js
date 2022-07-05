module.exports = {
  apps: [
    {
      name: 'mts-admin-service',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
