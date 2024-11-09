import logger from "./logger.js";
import { FeedObj, FeedDetail } from "./types.js";
import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const selectAllRss = async (): Promise<FeedObj[]> => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT id, rss_url FROM blog LIMIT 10`
    );

    return rows;
  } catch (err) {
    console.log(err);
    return [];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// feed 에 전달할 데이터들을 받아서 DB에 저장하는 함수
export const insertFeeds = async (resultData: FeedDetail[]) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

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
    await connection.query(query, [values]);
    await connection.commit();
    logger.info(
      `${resultData.length}개의 피드 데이터가 성공적으로 삽입되었습니다.`
    );
  } catch (err) {
    if (connection) await connection.rollback();
    logger.error("데이터 삽입 중 오류 발생:", err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
