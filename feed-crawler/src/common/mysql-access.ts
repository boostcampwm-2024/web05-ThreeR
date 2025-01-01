import * as mysql from "mysql2/promise";
import { CONNECTION_LIMIT } from "./constant";
import { PoolConnection } from "mysql2/promise";
import logger from "./logger";
import { FeedDetail, RssObj } from "./types";

export class MySQLRepository {
  private static instance: MySQLRepository;
  private pool = this.createPool();
  private nameTag: string = "[MySQL]";
  private constructor() {}

  static getInstance(): MySQLRepository {
    if (!MySQLRepository.instance) {
      MySQLRepository.instance = new MySQLRepository();
    }
    return MySQLRepository.instance;
  }

  private createPool() {
    return mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectionLimit: CONNECTION_LIMIT,
    });
  }

  private async executeQuery<T>(query: string, params: any[] = []) {
    let connection: PoolConnection;
    try {
      connection = await this.pool.getConnection();
      const [rows] = await connection.query(query, params);
      return rows as T[];
    } catch (error) {
      logger.error(
        `${this.nameTag} 쿼리 ${query} 실행 중 오류 발생
        오류 메시지: ${error.message}
        스택 트레이스: ${error.stack}`
      );
    } finally {
      if (connection) {
        try {
          if (connection) connection.release();
        } catch (error) {
          logger.error(
            `${this.nameTag} connection release 중 오류 발생
            오류 메시지: ${error.message}
            스택 트레이스: ${error.stack}`
          );
        }
      }
    }
  }

  public async selectAllRss(): Promise<RssObj[]> {
    const query = `SELECT id, rss_url as rssUrl, name as blogName, blog_platform as blogPlatform
    FROM rss_accept`;
    return this.executeQuery(query);
  }

  public async insertFeeds(resultData: FeedDetail[]) {
    const query = `
        INSERT INTO feed (blog_id, created_at, title, path, thumbnail)
        VALUES (?, ?, ?, ?, ?)
    `;

    const insertPromises = resultData.map(async (feed) => {
      return this.executeQuery(query, [
        feed.blogId,
        feed.pubDate,
        feed.title,
        feed.link,
        feed.imageUrl,
      ]);
    });

    const promiseResults = await Promise.all(insertPromises);

    const insertedFeeds = promiseResults
      .map((result, index) => {
        if (result) {
          const insertId = result["insert_id"];
          return {
            ...resultData[index],
            id: insertId,
          };
        }
      })
      .filter((result) => result);

    logger.info(
      `${this.nameTag} ${insertedFeeds.length}개의 피드 데이터가 성공적으로 데이터베이스에 삽입되었습니다.`
    );
    return insertedFeeds;
  }

  public async end() {
    await this.pool.end();
  }
}
