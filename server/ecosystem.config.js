module.exports = {
  apps: [
    {
      name: 'Denamu',
      script: './dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
