import { INestApplication } from '@nestjs/common';
import { RedisService } from '../../src/common/redis/redis.service';
import * as request from 'supertest';
import { redisKeys } from '../../src/common/redis/redis.constant';
import { RssAcceptFixture } from '../fixture/rssAccept.fixture';
import { FeedRepository } from '../../src/feed/feed.repository';
import { RssAcceptRepository } from '../../src/rss/rss.repository';
import { FeedFixture } from '../fixture/feed.fixture';

describe('Today view count statistic E2E Test : GET /api/statistic/today', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.testApp;
    const feedRepository = app.get(FeedRepository);
    const rssAcceptRepository = app.get(RssAcceptRepository);
    const redisService = app.get(RedisService);
    const [blog] = await Promise.all([
      rssAcceptRepository.save(RssAcceptFixture.createRssAcceptFixture()),
      redisService.redisClient.zadd(
        redisKeys.FEED_TREND_KEY,
        '1',
        5,
        '2',
        4,
        '3',
        3,
        '4',
        2,
        '5',
        1,
      ),
    ]);
    for (let i = 1; i <= 5; i++) {
      await feedRepository.save(FeedFixture.createFeedFixture(blog, {}, i));
    }
  });
  it('값을 입력 하지 않아 10개의 데이터만 요청한다.', async () => {
    // when
    const response = await request(app.getHttpServer()).get(
      '/api/statistic/today',
    );

    // then
    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([
      {
        id: 1,
        title: 'test1',
        viewCount: 5,
      },
      {
        id: 2,
        title: 'test2',
        viewCount: 4,
      },
      {
        id: 3,
        title: 'test3',
        viewCount: 3,
      },
      {
        id: 4,
        title: 'test4',
        viewCount: 2,
      },
      {
        id: 5,
        title: 'test5',
        viewCount: 1,
      },
    ]);
  });
  it('양수를 입력하여 제한된 통계를 요청한다.', async () => {
    // when
    const response = await request(app.getHttpServer()).get(
      '/api/statistic/today?limit=1',
    );

    // then
    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual([
      {
        id: 1,
        title: 'test1',
        viewCount: 5,
      },
    ]);
  });
});
