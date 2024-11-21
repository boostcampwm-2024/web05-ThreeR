import logger from "./logger.js";
import { FeedObj, FeedDetail } from "./types.js";
import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";

dotenv.config({ path: "./rss-notifier/.env" });

const CONNECTION_LIMIT = 50;

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: CONNECTION_LIMIT,
});

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
  const query = `SELECT id, rss_url
                 FROM blog`;
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
        feed.blog_id,
        feed.pub_date,
        feed.title,
        feed.link,
        feed.imageUrl,
      ]);
      successCount++;

    }
  } catch (error) {
    logger.error(`누락된 피드 데이터가 존재합니다. 에러 내용: ${error}`);
  }

  logger.info(`${successCount}개의 피드 데이터가 성공적으로 삽입되었습니다.`);
};
