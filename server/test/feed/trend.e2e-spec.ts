import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { WinstonLoggerService } from '../../src/common/logger/logger.service';
import { InternalExceptionsFilter } from '../../src/common/filters/internal-exceptions.filter';
import { HttpExceptionsFilter } from '../../src/common/filters/http-exception.filter';
import * as request from 'supertest';
import { RedisService } from '../../src/common/redis/redis.service';
import { DataSource } from 'typeorm';
import { Feed } from '../../src/feed/feed.entity';
import { Blog } from '../../src/blog/blog.entity';
import { INestApplication } from '@nestjs/common';
import { redisKeys } from '../../src/common/redis/redis.constant';

describe('Trend API', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let redisService: RedisService;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const logger = app.get(WinstonLoggerService);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(
      new InternalExceptionsFilter(logger),
      new HttpExceptionsFilter(),
    );
    redisService = app.get(RedisService);
    await app.init();

    const orm = app.get(DataSource);
    const feedRepository = orm.getRepository(Feed);
    const blogRepository = orm.getRepository(Blog);
    const blogs = await blogRepository.save([
      {
        id: 1,
        name: 'testName1',
        userName: 'testUserName1',
        email: 'testEmail1',
        rssUrl: 'testRSS1',
      },
      {
        id: 2,
        name: 'testName2',
        userName: 'testUserName2',
        email: 'testEmail2',
        rssUrl: 'testRSS2',
      },
      {
        id: 3,
        name: 'testName3',
        userName: 'testUserName3',
        email: 'testEmail3',
        rssUrl: 'testRSS3',
      },
    ]);
    await feedRepository.save([
      {
        id: 1,
        createdAt: '2024-11-24T01:00:00.000Z',
        title: 'testFeed1',
        viewCount: 0,
        path: 'https://testFeed1.com',
        thumbnail: 'https://testFeed1.com',
        blog: blogs[0],
      },
      {
        id: 2,
        createdAt: '2024-11-24T02:00:00.000Z',
        title: 'testFeed2',
        viewCount: 0,
        path: 'https://testFeed2.com',
        thumbnail: 'https://testFeed2.com',
        blog: blogs[1],
      },
      {
        id: 3,
        createdAt: '2024-11-24T03:00:00.000Z',
        title: 'testFeed3',
        viewCount: 0,
        path: 'https://testFeed3.com',
        thumbnail: 'https://testFeed3.com',
        blog: blogs[2],
      },
      {
        id: 4,
        createdAt: '2024-11-24T04:00:00.000Z',
        title: 'testFeed4',
        viewCount: 0,
        path: 'https://testFeed4.com',
        thumbnail: 'https://testFeed4.com',
        blog: blogs[2],
      },
    ]);
    redisService = app.get(RedisService);
  });

  beforeEach(async () => {
    await redisService.redisClient.flushall();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('게시글이 올바르게 존재할 때', () => {
    it('피드 조회가 없을 때', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [],
      });
    });

    it('피드 1개만 조회됐을 때', async () => {
      await redisService.redisClient.rpush(
        redisKeys.FEED_ORIGIN_TREND_KEY,
        '1',
      );
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 1,
            createdAt: '2024-11-24T01:00:00.000Z',
            title: 'testFeed1',
            viewCount: 0,
            path: 'https://testFeed1.com',
            thumbnail: 'https://testFeed1.com',
            author: 'testName1',
          },
        ],
      });
    });

    it('피드 2개만 조회됐을 때', async () => {
      await redisService.redisClient
        .pipeline()
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '2')
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '1')
        .exec();
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 2,
            createdAt: '2024-11-24T02:00:00.000Z',
            title: 'testFeed2',
            viewCount: 0,
            path: 'https://testFeed2.com',
            thumbnail: 'https://testFeed2.com',
            author: 'testName2',
          },
          {
            id: 1,
            createdAt: '2024-11-24T01:00:00.000Z',
            title: 'testFeed1',
            viewCount: 0,
            path: 'https://testFeed1.com',
            thumbnail: 'https://testFeed1.com',
            author: 'testName1',
          },
        ],
      });
    });
    it('피드 3개만 조회됐을 때', async () => {
      await redisService.redisClient
        .pipeline()
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '3')
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '2')
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '1')
        .exec();
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 3,
            createdAt: '2024-11-24T03:00:00.000Z',
            title: 'testFeed3',
            viewCount: 0,
            path: 'https://testFeed3.com',
            thumbnail: 'https://testFeed3.com',
            author: 'testName3',
          },
          {
            id: 2,
            createdAt: '2024-11-24T02:00:00.000Z',
            title: 'testFeed2',
            viewCount: 0,
            path: 'https://testFeed2.com',
            thumbnail: 'https://testFeed2.com',
            author: 'testName2',
          },
          {
            id: 1,
            createdAt: '2024-11-24T01:00:00.000Z',
            title: 'testFeed1',
            viewCount: 0,
            path: 'https://testFeed1.com',
            thumbnail: 'https://testFeed1.com',
            author: 'testName1',
          },
        ],
      });
    });
    it('피드 4개만 조회됐을 때', async () => {
      await redisService.redisClient
        .pipeline()
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '4')
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '3')
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '2')
        .rpush(redisKeys.FEED_ORIGIN_TREND_KEY, '1')
        .exec();
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 4,
            createdAt: '2024-11-24T04:00:00.000Z',
            title: 'testFeed4',
            viewCount: 0,
            path: 'https://testFeed4.com',
            thumbnail: 'https://testFeed4.com',
            author: 'testName3',
          },
          {
            id: 3,
            createdAt: '2024-11-24T03:00:00.000Z',
            title: 'testFeed3',
            viewCount: 0,
            path: 'https://testFeed3.com',
            thumbnail: 'https://testFeed3.com',
            author: 'testName3',
          },
          {
            id: 2,
            createdAt: '2024-11-24T02:00:00.000Z',
            title: 'testFeed2',
            viewCount: 0,
            path: 'https://testFeed2.com',
            thumbnail: 'https://testFeed2.com',
            author: 'testName2',
          },
          {
            id: 1,
            createdAt: '2024-11-24T01:00:00.000Z',
            title: 'testFeed1',
            viewCount: 0,
            path: 'https://testFeed1.com',
            thumbnail: 'https://testFeed1.com',
            author: 'testName1',
          },
        ],
      });
    });
  });
});
