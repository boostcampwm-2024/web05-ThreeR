import logger from "./logger";
import { RssObj, FeedDetail } from "./types";
import * as mysql from "mysql2/promise";
import Redis from "ioredis";
import * as process from "node:process";
import { CONNECTION_LIMIT, INSERT_ID, redisConstant } from "./constant";
import * as dotenv from "dotenv";
import { PoolConnection } from "mysql2/promise";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? "feed-crawler/.env" : ".env",
});

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

export const executeQuery = async <T>(query: string, params: any[] = []) => {
  let connection: PoolConnection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, params);
    return rows as T[];
  } catch (err) {
    logger.error(`[MySQL] 쿼리 ${query} 실행 중 오류 발생`);
    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const selectAllRss = async (): Promise<RssObj[]> => {
  const query = `SELECT id, rss_url as rssUrl, name as blogName, blog_platform as blogPlatform
                 FROM rss_accept`;
  return executeQuery(query);
};

export const insertFeeds = async (
  resultData: FeedDetail[]
): Promise<FeedDetail[]> => {
  const query = `
        INSERT INTO feed (blog_id, created_at, title, path, thumbnail)
        VALUES (?, ?, ?, ?, ?)
    `;
  const connection = await pool.getConnection();
  const insertPromises = resultData.map((feed) => {
    return connection.query(query, [
      feed.blogId,
      feed.pubDate,
      feed.title,
      feed.link,
      feed.imageUrl,
    ]);
  });

  const results = await Promise.allSettled(insertPromises);

  const failedInserts = results.filter(
    (result) => result.status === "rejected"
  );
  failedInserts.forEach((failed) => {
    const error = (failed as PromiseRejectedResult).reason;
    logger.error(
      `[MySQL] 피드 삽입 실패. 에러 메시지: ${error.message}\n스택 트레이스: ${error.stack}`
    );
  });

  const insertedFeeds = results
    .filter((result) => result.status === "fulfilled")
    .map((result, index) => {
      const insertId = (result as PromiseFulfilledResult<any>).value[0][
        INSERT_ID
      ];
      return {
        ...resultData[index],
        id: insertId,
      };
    });

  logger.info(
    `[MySQL] ${insertedFeeds.length}개의 피드 데이터가 성공적으로 데이터베이스에 삽입되었습니다.`
  );
  return insertedFeeds;
};

export const deleteRecentFeed = async () => {
  const redis = await createRedisClient();
  try {
    const keysToDelete = [];
    let cursor = "0";
    do {
      const [newCursor, keys] = await redis.scan(
        cursor,
        "MATCH",
        redisConstant.FEED_RECENT_ALL_KEY,
        "COUNT",
        "100"
      );
      keysToDelete.push(...keys);
      cursor = newCursor;
    } while (cursor !== "0");

    if (keysToDelete.length > 0) {
      await redis.del(...keysToDelete);
    }
  } catch (error) {
    logger.error(
      `[Redis] 최근 게시글 캐시를 삭제하는 도중 에러가 발생했습니다. 에러 메시지: ${error.message}\n스택 트레이스: ${error.stack}`
    );
  } finally {
    if (redis) await redis.quit();
  }
  logger.info(`[Redis] 최근 게시글 캐시가 정상적으로 삭제되었습니다.`);
};

export const setRecentFeedList = async (resultList: FeedDetail[]) => {
  const redis = await createRedisClient();
  try {
    const pipeLine = redis.pipeline();
    for (const feed of resultList) {
      pipeLine.hset(`feed:recent:${feed.id}`, {
        id: feed.id,
        blogPlatform: feed.blogPlatform,
        createdAt: feed.pubDate,
        viewCount: 0,
        blogName: feed.blogName,
        thumbnail: feed.imageUrl,
        path: feed.link,
        title: feed.title,
      });
    }
    await pipeLine.exec();
  } catch (error) {
    logger.error(
      `[Redis] 최근 게시글 캐시를 저장하는 도중 에러가 발생했습니다. 에러 메시지: ${error.message}\n스택 트레이스: ${error.stack}`
    );
  } finally {
    if (redis) await redis.quit();
  }
  logger.info(`[Redis] 최근 게시글 캐시가 정상적으로 저장되었습니다.`);
};
