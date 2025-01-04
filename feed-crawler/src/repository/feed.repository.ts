import { FeedDetail } from "../common/types";
import logger from "../common/logger";
import { mysqlConnection } from "../common/mysql-access";
import { redisConstant } from "../common/constant";
import { redisConnection } from "../common/redis-access";

class FeedRepository {
  public async insertFeeds(resultData: FeedDetail[]) {
    const query = `
            INSERT INTO feed (blog_id, created_at, title, path, thumbnail)
            VALUES (?, ?, ?, ?, ?)
        `;

    const insertPromises = resultData.map(async (feed) => {
      return mysqlConnection.executeQuery(query, [
        feed.blogId,
        feed.pubDate,
        feed.title,
        feed.link,
        feed.imageUrl,
      ]);
    });

    const promiseResults = await Promise.all(insertPromises);

    const insertedFeeds = promiseResults
      .map((result: any, index) => {
        if (result) {
          const insertId = result.insertId;
          return {
            ...resultData[index],
            id: insertId,
          };
        }
      })
      .filter((result) => result);

    logger.info(
      `[MySQL] ${insertedFeeds.length}개의 피드 데이터가 성공적으로 데이터베이스에 삽입되었습니다.`
    );
    return insertedFeeds;
  }

  async deleteRecentFeed() {
    try {
      redisConnection.connect();
      const keysToDelete = [];
      let cursor = "0";
      do {
        const [newCursor, keys] = await redisConnection.command.scan(
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
        await redisConnection.command.del(...keysToDelete);
      }
    } catch (error) {
      logger.error(
        `[Redis] 최근 게시글 캐시를 삭제하는 도중 에러가 발생했습니다.
        에러 메시지: ${error.message}
        스택 트레이스: ${error.stack}`
      );
    } finally {
      await redisConnection.quit();
    }
    logger.info(`[Redis] 최근 게시글 캐시가 정상적으로 삭제되었습니다.`);
  }

  async setRecentFeedList(feedLists: FeedDetail[]) {
    try {
      redisConnection.connect();
      const pipeLine = redisConnection.command.pipeline();
      for (const feed of feedLists) {
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
        `[Redis] 최근 게시글 캐시를 저장하는 도중 에러가 발생했습니다.
        에러 메시지: ${error.message}
        스택 트레이스: ${error.stack}`
      );
    } finally {
      await redisConnection.quit();
    }
    logger.info(`[Redis] 최근 게시글 캐시가 정상적으로 저장되었습니다.`);
  }
}

export const feedRepository = new FeedRepository();
