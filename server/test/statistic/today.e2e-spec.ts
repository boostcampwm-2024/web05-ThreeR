import { INestApplication } from '@nestjs/common';
import { RedisService } from '../../src/common/redis/redis.service';
import * as request from 'supertest';
import { redisKeys } from '../../src/common/redis/redis.constant';
import { RssAcceptFixture } from '../rss/fixture/rssAcceptFixture';
import { FeedRepository } from '../../src/feed/feed.repository';
import { RssAcceptRepository } from '../../src/rss/rss.repository';

describe('Today view count statistic E2E Test : GET /api/statistic/today', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.testApp;
    const feedRepository = app.get(FeedRepository);
    const rssAcceptRepository = app.get(RssAcceptRepository);
    const redisService = app.get(RedisService);
    const [blog] = await Promise.all([
      rssAcceptRepository.save(RssAcceptFixture.createRssAcceptFixture()),
      redisService.redisClient.set('auth:test1234', 'test'),
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
    await feedRepository.save([
      {
        id: 1,
        createdAt: '2024-11-26 09:00:00',
        title: 'test1',
        path: 'test1',
        thumbnail: 'https://test.com/test.png',
        blog: blog,
      },
      {
        id: 2,
        createdAt: '2024-11-26 09:00:00',
        title: 'test2',
        path: 'test2',
        thumbnail: 'https://test.com/test.png',
        blog: blog,
      },
      {
        id: 3,
        createdAt: '2024-11-26 09:00:00',
        title: 'test3',
        path: 'test3',
        thumbnail: 'https://test.com/test.png',
        blog: blog,
      },
      {
        id: 4,
        createdAt: '2024-11-26 09:00:00',
        title: 'test4',
        path: 'test4',
        thumbnail: 'https://test.com/test.png',
        blog: blog,
      },
      {
        id: 5,
        createdAt: '2024-11-26 09:00:00',
        title: 'test5',
        path: 'test5',
        thumbnail: 'https://test.com/test.png',
        blog: blog,
      },
    ]);
  });

  describe('관리자 권한이 없을 경우', () => {
    it('관리자 쿠키가 없다.', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/statistic/today?limit=1.1',
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('인증되지 않은 요청입니다.');
    });
    it('관리자 쿠키가 만료되었다.', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/statistic/today?limit=1.1')
        .set('Cookie', 'sessionId=test4321');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('인증되지 않은 요청입니다.');
    });
  });
  describe('관리자 권한이 있을 경우', () => {
    describe('limit 값을 올바르게 입력하지 않았을 경우', () => {
      it('실수를 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/statistic/today?limit=1.1')
          .set('Cookie', 'sessionId=test1234');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수로 입력해주세요.');
      });
      it('문자열을 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/statistic/today?limit=test')
          .set('Cookie', 'sessionId=test1234');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수로 입력해주세요.');
      });
      it('음수를 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/statistic/today?limit=-100')
          .set('Cookie', 'sessionId=test1234');
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({
          message: 'limit 값은 1 이상이어야 합니다.',
        });
      });
    });

    describe('limit 값을 올바르게 입력했을 경우', () => {
      it('값을 입력 하지 않는다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/statistic/today')
          .set('Cookie', 'sessionId=test1234');
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
          message: '금일 조회수 통계 조회 완료',
          data: [
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
          ],
        });
      });
      it('양수를 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/statistic/today?limit=1')
          .set('Cookie', 'sessionId=test1234');
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
          message: '금일 조회수 통계 조회 완료',
          data: [
            {
              id: 1,
              title: 'test1',
              viewCount: 5,
            },
          ],
        });
      });
    });
  });
});
