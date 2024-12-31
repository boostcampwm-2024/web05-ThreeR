import { pool } from "./common/db-access.js";
import logger from "./common/logger.js";
import { performTask } from "./feed-crawler.js";

async function runCrawler() {
  logger.info("==========작업 시작==========");
  const startTime = Date.now();
  await performTask();
  const endTime = Date.now();

  const executionTime = endTime - startTime;
  logger.info(`Execution time: ${executionTime / 1000}seconds`);
  logger.info("==========작업 완료==========");
  pool.end();
}

runCrawler();
