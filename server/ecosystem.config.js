module.exports = {
  apps: [
    {
      name: 'Denamu',
      script: './dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
