const path = require("path");

module.exports = {
  apps: [
    {
      name: "Denamu",
      script: "./server/dist/main.js",
      instances: "1",
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        ENV_PATH: "server/configs/.env.db.production",
      },
    },
    {
      name: "rss-notifier",
      script: "./rss-notifier/dist/main.js",
      instances: "1",
      exec_mode: "fork",
      cron_restart: `*/1 * * * *`, // 30분 마다 rss-notifier 재시작
      autorestart: false,
      watch: false,
    },
  ],
};
