import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    super(redisClient.options);
  }
}
