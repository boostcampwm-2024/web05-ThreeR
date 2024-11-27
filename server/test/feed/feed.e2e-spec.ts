import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feed } from '../../src/feed/feed.entity';
import * as request from 'supertest';
import { FeedFixture } from './fixture/feedFixture';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RssAccept } from '../../src/rss/rss.entity';
import { RedisService } from '../../src/common/redis/redis.service';
import { redisKeys } from '../../src/common/redis/redis.constant';

describe('Feed E2E Test', () => {
  let app: INestApplication;
  let redisService: RedisService;

  beforeAll(async () => {
    app = global.testApp;
    redisService = app.get(RedisService);
    const feedRepository = app.get<Repository<Feed>>(getRepositoryToken(Feed));
    const rssAcceptRepository = app.get<Repository<RssAccept>>(
      getRepositoryToken(RssAccept),
    );
    const blog = await rssAcceptRepository.save({
      name: 'test',
      userName: 'test',
      email: 'test@test.com',
      rssUrl: 'https://test.com/rss',
    });
    const feeds = Array.from({ length: 20 }).map((_, i) => {
      const title = `Test Feed ${i + 1}`;
      const path = `http://test.com/post/${i + 1}`;
      const thumbnail = `http://test.com/thumbnail/${i + 1}`;
      return FeedFixture.createFeedFixture(blog, { title, path, thumbnail });
    });
    await feedRepository.save(feeds);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/feed', () => {
    describe('페이지네이션이 정상적으로 동작한다.', () => {
      it('lastId가 없으면 최신 피드부터 전송한다.', async () => {
        //given
        const testQuery = { limit: 5 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(5);
        expect(response.body.data.hasMore).toBe(true);
        expect(response.body.data.lastId).toBe(16);
      });

      it('lastId가 있으면 해당 피드 다음 순서부터 전송한다.', async () => {
        //given
        const testQuery = { limit: 5, lastId: 11 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(5);
        expect(response.body.data.hasMore).toBe(true);
        expect(response.body.data.lastId).toBe(6);
      });

      it('남은 피드 개수보다 limit의 크기가 커도 정상적으로 동작한다.', async () => {
        //given
        const testQuery = { limit: 15, lastId: 10 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(9);
        expect(response.body.data.hasMore).toBe(false);
        expect(response.body.data.lastId).toBe(1);
      });

      it('남은 피드 개수가 0이면 lastId 0, 빈 배열로 응답한다.', async () => {
        //given
        const testQuery = { limit: 15, lastId: 1 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(0);
        expect(response.body.data.hasMore).toBe(false);
        expect(response.body.data.lastId).toBe(0);
      });
    });

    describe('limit에 자연수가 아닌 값을 입력한다.', () => {
      it('limit에 1보다 작은 값을 입력한다.', async () => {
        //given
        const testQuery = { limit: -10, lastId: 10 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('limit 값은 1 이상이어야 합니다.');
      });

      it('limit에 실수를 입력한다.', async () => {
        //given
        const testQuery = { limit: 5.2231, lastId: 10 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });

      it('limit에 문자열을 입력한다.', async () => {
        //given
        const testQuery = { limit: 'test', lastId: 10 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });
    });

    describe('lastId에 0 이상 정수가 아닌 값을 입력한다.', () => {
      it('lastId에 음수를 입력한다.', async () => {
        //given
        const testQuery = { limit: 5, lastId: -10 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('lastId 값은 0 이상이어야 합니다.');
      });

      it('lastId에 실수를 입력한다.', async () => {
        //given
        const testQuery = { limit: 5, lastId: 10.12142 };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });

      it('lastId에 문자열을 입력한다.', async () => {
        //given
        const testQuery = { limit: 5, lastId: 'test' };

        //when
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query(testQuery);

        //then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });
    });
  });

  describe('POST /api/feed/:feedId', () => {
    describe('Redis에 해당 IP가 없을 때', () => {
      it('쿠키가 없는 경우', async () => {
        //given
        const testNewIp = `127.0.0.1`;
        const testFeedId = 1;
        const testIp = `1.1.1.1`;
        const redis = redisService.redisClient;
        await redisService.redisClient.sadd(`feed:${testFeedId}:ip`, testIp);

        try {
          //when
          const response = await request(app.getHttpServer())
            .post(`/api/feed/${testFeedId}`)
            .set('CF-Connecting-IP', testNewIp);

          //then
          const feedDailyViewCount = parseInt(
            await redis.zscore(redisKeys.FEED_TREND_KEY, testFeedId.toString()),
          );
          expect(response.status).toBe(200);
          expect(response.body.message).toBe(
            '요청이 성공적으로 처리되었습니다.',
          );
          expect(feedDailyViewCount).toBe(1);
        } finally {
          //cleanup
          await redisService.redisClient.zrem(
            redisKeys.FEED_TREND_KEY,
            testFeedId.toString(),
          );
          await redisService.redisClient.srem(`feed:${testFeedId}:ip`, testIp);
        }
      });
    });

    describe('Redis에 해당 IP가 있을 때', () => {
      it('쿠키가 있는 경우', async () => {
        //given
        const testFeedId = 1;
        const testIp = `1.1.1.1`;
        const redis = redisService.redisClient;
        await redisService.redisClient.sadd(`feed:${testFeedId}:ip`, testIp);

        try {
          //when
          const response = await request(app.getHttpServer())
            .post(`/api/feed/${testFeedId}`)
            .set('Cookie', `View_count_${testFeedId}=${testFeedId}`)
            .set('CF-Connecting-IP', testIp);

          //then
          const feedDailyViewCount = await redis.zscore(
            redisKeys.FEED_TREND_KEY,
            testFeedId.toString(),
          );
          expect(response.status).toBe(200);
          expect(response.body.message).toBe(
            '요청이 성공적으로 처리되었습니다.',
          );
          expect(feedDailyViewCount).toBeNull();
        } finally {
          //cleanup
          await redisService.redisClient.zrem(
            redisKeys.FEED_TREND_KEY,
            testFeedId.toString(),
          );
          await redisService.redisClient.srem(`feed:${testFeedId}:ip`, testIp);
        }
      });

      it('쿠키가 없는 경우', async () => {
        //given
        const testFeedId = 1;
        const testIp = `1.1.1.1`;
        const redis = redisService.redisClient;
        await redisService.redisClient.sadd(`feed:${testFeedId}:ip`, testIp);

        try {
          //when
          const response = await request(app.getHttpServer())
            .post(`/api/feed/${testFeedId}`)
            .set('CF-Connecting-IP', testIp);

          //then
          const feedDailyViewCount = await redis.zscore(
            redisKeys.FEED_TREND_KEY,
            testFeedId.toString(),
          );
          expect(response.status).toBe(200);
          expect(response.body.message).toBe(
            '요청이 성공적으로 처리되었습니다.',
          );
          expect(feedDailyViewCount).toBeNull();
        } finally {
          //cleanup
          await redisService.redisClient.zrem(
            redisKeys.FEED_TREND_KEY,
            testFeedId.toString(),
          );
          await redisService.redisClient.srem(`feed:${testFeedId}:ip`, testIp);
        }
      });

      describe('잘못된 요청을 보냈을 때', () => {
        it('해당 피드 ID가 존재하지 않는 경우', async () => {
          //given
          const notExistFeedId = 50000;

          //when
          const response = await request(app.getHttpServer()).post(
            `/api/feed/${notExistFeedId}`,
          );

          //then
          expect(response.status).toBe(404);
          expect(response.body.message).toBe(
            `${notExistFeedId}번 피드를 찾을 수 없습니다.`,
          );
        });
      });
    });
  });
});
