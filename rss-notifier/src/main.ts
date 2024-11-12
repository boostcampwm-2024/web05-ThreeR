import { pool } from "./db-access.js";
import logger from "./logger.js";
import { performTask } from "./rss-notifier.js";

async function runNotifier() {
  logger.info("==========작업 시작==========");
  const startTime = Date.now();
  await performTask();
  const endTime = Date.now();

  const executionTime = endTime - startTime;
  logger.info(`Execution time: ${executionTime / 1000}seconds`);
  logger.info("==========작업 완료==========");
  pool.end();
}

runNotifier();
