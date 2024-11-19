import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { LoggingInterceptor } from '../../src/common/logger/logger.interceptor';
import { WinstonLoggerService } from '../../src/common/logger/logger.service';
import { InternalExceptionsFilter } from '../../src/common/filters/internal-exceptions.filter';
import { HttpExceptionsFilter } from '../../src/common/filters/http-exception.filter';
import * as request from 'supertest';
import { RedisService } from '../../src/common/redis/redis.service';
import { DataSource } from 'typeorm';
import { Feed } from '../../src/feed/feed.entity';
import { Blog } from '../../src/blog/blog.entity';

describe('Trend API', () => {
  let app;
  let moduleFixture: TestingModule;
  let redisService;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const logger = app.get(WinstonLoggerService);
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.useGlobalFilters(
      new InternalExceptionsFilter(logger),
      new HttpExceptionsFilter(),
    );
    redisService = app.get(RedisService);
    await app.init();

    const orm = app.get(DataSource);
    const feedRepository = orm.getRepository(Feed);
    const blogRepository = orm.getRepository(Blog);
    await blogRepository.save([
      {
        id: 1,
        name: 'test',
        userName: '안성윤',
        email: 'test',
        rssUrl: 'test',
      },
      {
        id: 2,
        name: 'test2',
        userName: '조민석',
        email: 'test2',
        rssUrl: 'test2',
      },
      {
        id: 3,
        name: 'test3',
        userName: '박무성',
        email: 'test3',
        rssUrl: 'test3',
      },
    ]);
    await feedRepository.save([
      {
        id: 1,
        title:
          '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
        path: 'https://asn6878.tistory.com/9',
        createdAt: '2022-09-05T09:00:00.000Z',
        thumbnail:
          'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
        blog: 1,
      },
      {
        id: 2,
        title:
          '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
        path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
        createdAt: '2024-08-14T14:07:49.000Z',
        thumbnail:
          'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
        blog: 2,
      },
      {
        id: 3,
        title: '제목',
        path: 'https://asn6878.tistory.com/10',
        createdAt: '2022-09-05T09:00:00.000Z',
        thumbnail:
          'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
        blog: 3,
      },
      {
        id: 4,
        title: '제목',
        path: 'https://asn6878.tistory.com/11',
        createdAt: '2022-09-05T10:00:00.000Z',
        thumbnail:
          'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
        blog: 3,
      },
      {
        id: 5,
        title: '제목',
        path: 'https://asn6878.tistory.com/12',
        createdAt: '2022-09-05T10:00:00.000Z',
        thumbnail:
          'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
        blog: 2,
      },
    ]);
  });

  beforeEach(async () => {
    redisService = app.get(RedisService);
    await redisService.flushall();
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
      await redisService.zadd('feed:trend', 10, '1');
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 1,
            author: '안성윤',
            title:
              '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
            path: 'https://asn6878.tistory.com/9',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
        ],
      });
    });

    it('피드 2개만 조회됐을 때', async () => {
      await Promise.all([
        redisService.zadd('feed:trend', 10, '1'),
        redisService.zadd('feed:trend', 20, '2'),
      ]);
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 1,
            author: '안성윤',
            title:
              '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
            path: 'https://asn6878.tistory.com/9',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
          {
            id: 2,
            author: '조민석',
            title:
              '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
            path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
            createdAt: '2024-08-14T14:07:49.000Z',
            thumbnail:
              'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
            viewCount: 0,
          },
        ],
      });
    });
    it('피드 3개만 조회됐을 때', async () => {
      await Promise.all([
        redisService.zadd('feed:trend', 10, '1'),
        redisService.zadd('feed:trend', 20, '2'),
        redisService.zadd('feed:trend', 30, '3'),
      ]);
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 1,
            author: '안성윤',
            title:
              '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
            path: 'https://asn6878.tistory.com/9',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
          {
            id: 2,
            author: '조민석',
            title:
              '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
            path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
            createdAt: '2024-08-14T14:07:49.000Z',
            thumbnail:
              'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
            viewCount: 0,
          },
          {
            id: 3,
            author: '박무성',
            title: '제목',
            path: 'https://asn6878.tistory.com/10',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
        ],
      });
    });
    it('피드 4개만 조회됐을 때', async () => {
      await Promise.all([
        redisService.zadd('feed:trend', 10, '1'),
        redisService.zadd('feed:trend', 20, '2'),
        redisService.zadd('feed:trend', 30, '3'),
        redisService.zadd('feed:trend', 40, '4'),
      ]);
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 1,
            author: '안성윤',
            title:
              '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
            path: 'https://asn6878.tistory.com/9',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
          {
            id: 2,
            author: '조민석',
            title:
              '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
            path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
            createdAt: '2024-08-14T14:07:49.000Z',
            thumbnail:
              'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
            viewCount: 0,
          },
          {
            id: 3,
            author: '박무성',
            title: '제목',
            path: 'https://asn6878.tistory.com/10',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
          {
            id: 4,
            author: '박무성',
            title: '제목',
            path: 'https://asn6878.tistory.com/11',
            createdAt: '2022-09-05T10:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
        ],
      });
    });
    it('피드 5개 이상 조회됐을 때', async () => {
      await Promise.all([
        redisService.zadd('feed:trend', 10, '1'),
        redisService.zadd('feed:trend', 20, '2'),
        redisService.zadd('feed:trend', 30, '3'),
        redisService.zadd('feed:trend', 40, '4'),
        redisService.zadd('feed:trend', 50, '5'),
      ]);
      const response = await request(app.getHttpServer()).get(
        '/api/feed/trend',
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        message: '트렌드 피드 조회 완료',
        data: [
          {
            id: 1,
            author: '안성윤',
            title:
              '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
            path: 'https://asn6878.tistory.com/9',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
          {
            id: 2,
            author: '조민석',
            title:
              '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
            path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
            createdAt: '2024-08-14T14:07:49.000Z',
            thumbnail:
              'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
            viewCount: 0,
          },
          {
            id: 3,
            author: '박무성',
            title: '제목',
            path: 'https://asn6878.tistory.com/10',
            createdAt: '2022-09-05T09:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
          {
            id: 4,
            author: '박무성',
            title: '제목',
            path: 'https://asn6878.tistory.com/11',
            createdAt: '2022-09-05T10:00:00.000Z',
            thumbnail:
              'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
            viewCount: 0,
          },
        ],
      });
    });
  });

  describe('게시글이 올바르게 존재하지 않을 때', () => {
    it('조회 테이블에만 데이터가 있고 RDBMS에 데이터가 없을 때', async () => {
      await Promise.all([redisService.zadd('feed:trend', 10, '6')]);
    });
  });
});
