import Redis from "ioredis";
import logger from "../common/logger";
import * as dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? "feed-crawler/.env" : ".env",
});

class RedisConnection {
  private redis: Redis;
  private nameTag: string;

  constructor() {
    this.nameTag = "[Redis]";
  }

  connect() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    });
  }

  async quit() {
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

  get command() {
    return this.redis;
  }
}

export const redisConnection = new RedisConnection();
