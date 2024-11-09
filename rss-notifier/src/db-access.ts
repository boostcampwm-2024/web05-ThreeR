import logger from "./logger.js";
import { FeedObj, FeedDetail } from "./types.js";
import 'dotenv/config';
import * as mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const executeQuery = async (query: string, params: any[] = []) => {
  let connection;
  connection = await pool.getConnection();
  const [rows] = await connection.query(query, params);

  connection.release();
  return rows;
};

// 모든 RSS 데이터를 선택하는 함수
export const selectAllRss = async (): Promise<FeedObj[]> => {
  const query = `SELECT id, rss_url FROM blog`;
  try {
    return await executeQuery(query);
  } catch (err) {
    logger.error("쿼리 " + query + " 실행 중 오류 발생:", err);
    return [];
  }
};

// feed 데이터들을 받아 DB에 저장하는 함수
export const insertFeeds = async (resultData: FeedDetail[]) => {
  const query = `
    INSERT INTO feed (blog_id, created_at, title, path, thumbnail)
    VALUES ?
  `;

  // 여러 행의 값을 배열 형식으로 준비
  const values = resultData.map((feed) => [
    feed.blog_id,
    feed.pub_date,
    feed.title,
    feed.link,
    feed.imageUrl,
  ]);

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await executeQuery(query, [values]);
    await connection.commit();

    logger.info(
      `${resultData.length}개의 피드 데이터가 성공적으로 삽입되었습니다.`
    );
  } catch (err) {
    if (connection) await connection.rollback();
    logger.error("쿼리 " + query + " 실행 중 오류 발생:", err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
