module.exports = {
  apps: [
    {
      name: "Denamu",
      script: "./server/dist/main.js",
      instances: "2",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "rss-notifier",
      script: "./rss-notifier/dist/main.js",
      instances: "1",
      exec_mode: "fork",
      cron_restart: `0 * * * *`,
      autorestart: false,
      watch: false,
    },
  ],
};
