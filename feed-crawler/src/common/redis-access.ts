import Redis from "ioredis";
import logger from "./logger";
import { redisConstant } from "./constant";
import { FeedDetail } from "./types";

class RedisRepository {
  private redis: Redis;
  private nameTag: string;

  constructor() {
    this.nameTag = "[Redis]";
  }

  private connect() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    });
  }

  async deleteRecentFeed() {
    try {
      this.connect();
      const keysToDelete = [];
      let cursor = "0";
      do {
        const [newCursor, keys] = await this.redis.scan(
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
        await this.redis.del(...keysToDelete);
      }
    } catch (error) {
      logger.error(
        `${this.nameTag} 최근 게시글 캐시를 삭제하는 도중 에러가 발생했습니다.
        에러 메시지: ${error.message}
        스택 트레이스: ${error.stack}`
      );
    } finally {
      if (this.redis) {
        try {
          await this.redis.quit();
        } catch (error) {
          logger.error(
            `${this.nameTag} connection quit 중 오류 발생
            에러 메시지: ${error.message}
            스택 트레이스: ${error.stack}`
          );
        }
      }
    }
    logger.info(
      `${this.nameTag} 최근 게시글 캐시가 정상적으로 삭제되었습니다.`
    );
  }

  async setRecentFeedList(feedLists: FeedDetail[]) {
    try {
      this.connect();
      const pipeLine = this.redis.pipeline();
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
        `${this.nameTag} 최근 게시글 캐시를 저장하는 도중 에러가 발생했습니다.
        에러 메시지: ${error.message}
        스택 트레이스: ${error.stack}`
      );
    } finally {
      if (this.redis) {
        try {
          await this.redis.quit();
        } catch (error) {
          logger.error(
            `${this.nameTag} connection quit 중 오류 발생
                  에러 메시지: ${error.message}
                  스택 트레이스: ${error.stack}`
          );
        }
      }
    }
    logger.info(
      `${this.nameTag} 최근 게시글 캐시가 정상적으로 저장되었습니다.`
    );
  }
}

export const redisRepository = new RedisRepository();
