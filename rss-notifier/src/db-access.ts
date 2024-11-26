import logger from "./logger.js";
import { FeedObj, FeedDetail } from "./types.js";
import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";
import Redis from "ioredis";
import * as process from "node:process";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? "rss-notifier/.env" : ".env",
});

const CONNECTION_LIMIT = 50;

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: CONNECTION_LIMIT,
});

export const createRedisClient = async () => {
  return new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });
};

export const executeQuery = async (query: string, params: any[] = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (err) {
    logger.error("쿼리 " + query + " 실행 중 오류 발생:", err);
    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const selectAllRss = async (): Promise<FeedObj[]> => {
  const query = `SELECT id, rss_url as rssUrl
                 FROM rss_accept`;
  return executeQuery(query);
};

export const insertFeeds = async (resultData: FeedDetail[]) => {
  let successCount = 0;
  try {
    const query = `
        INSERT INTO feed (blog_id, created_at, title, path, thumbnail)
        VALUES (?, ?, ?, ?, ?)
    `;

    for (const feed of resultData) {
      await executeQuery(query, [
        feed.blogId,
        feed.pubDate,
        feed.title,
        feed.link,
        feed.imageUrl,
      ]);
      successCount++;
    }
  } catch (error) {
    logger.error(`누락된 피드 데이터가 존재합니다. 에러 내용: ${error}`);
  }
  logger.info(
    `${successCount}개의 피드 데이터가 성공적으로 데이터베이스에 삽입되었습니다.`,
  );
};

export const getRecentFeedStartId = async () => {
  let startId;
  try {
    const query = `SELECT id
                       FROM feed
                       ORDER BY id desc
                       LIMIT 1`;
    const result = await executeQuery(query);
    startId = result.length > 0 ? result[0].id + 1 : 1;
  } catch (error) {
    logger.error(`디비 접근에 실패했습니다. 에러 내용: ${error}`);
  }
  return startId;
};

export const deleteRecentFeedStartId = async () => {
  const redis = await createRedisClient();
  try {
    const keys = await redis.keys("feed:recent:*");
    if (keys.length > 0) {
      redis.del(...keys);
    }
    redis.set("feed:recent", "false");
  } catch (error) {
    logger.error(
      `Redis의 feed:recent:*를 삭제하는 도중 에러가 발생했습니다. 에러 내용: ${error}`,
    );
    if (redis) redis.disconnect();
  } finally {
    if (redis) redis.quit();
  }
  logger.info(`Redis의 feed:recent:* 값이 정상적으로 삭제되었습니다.`);
};

export const setRecentFeedList = async (startId: number) => {
  const redis = await createRedisClient();
  try {
    const query = `SELECT f.id,
                          f.created_at    AS createdAt,
                          f.title,
                          f.view_count    AS viewCount,
                          f.path,
                          f.thumbnail,
                          f.blog_id       AS blogId,
                          r.blog_platform AS blogPlatform,
                          r.name          AS author
                   FROM feed f
                   JOIN rss_accept r ON f.blog_id = r.id
                   WHERE f.id >= ${startId}`;
    const resultList = await executeQuery(query);
    for (const feed of resultList) {
      await redis.hset(`feed:recent:${feed.id}`, feed);
    }
    redis.set("feed:recent", "true");
  } catch (error) {
    logger.error(
      `Redis의 feed:recent:*를 저장하는 도중 에러가 발생했습니다. 에러 내용: ${error}`,
    );
  } finally {
    if (redis) redis.quit();
  }
  logger.info(`Redis의 feed:recent:* 값이 정상적으로 저장되었습니다.`);
};
