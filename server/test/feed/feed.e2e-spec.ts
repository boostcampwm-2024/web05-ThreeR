import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feed } from '../../src/feed/feed.entity';
import * as request from 'supertest';
import { FeedFixture } from './fixture/feedFixture';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RssAccept } from '../../src/rss/rss.entity';

describe('Feed E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.testApp;
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
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 5 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(5);
        expect(response.body.data.hasMore).toBe(true);
        expect(response.body.data.lastId).toBe(16);
      });

      it('lastId가 있으면 해당 피드 다음 순서부터 전송한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 5, lastId: 11 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(5);
        expect(response.body.data.hasMore).toBe(true);
        expect(response.body.data.lastId).toBe(6);
      });

      it('남은 피드 개수보다 limit의 크기가 커도 정상적으로 동작한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 15, lastId: 10 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(9);
        expect(response.body.data.hasMore).toBe(false);
        expect(response.body.data.lastId).toBe(1);
      });

      it('남은 피드 개수가 0이면 lastId 0, 빈 배열로 응답한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 15, lastId: 1 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('피드 조회 완료');
        expect(response.body.data.result).toHaveLength(0);
        expect(response.body.data.hasMore).toBe(false);
        expect(response.body.data.lastId).toBe(0);
      });
    });

    describe('limit에 자연수가 아닌 값을 입력한다.', () => {
      it('limit에 1보다 작은 값을 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: -10, lastId: 10 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('limit 값은 1 이상이어야 합니다.');
      });

      it('limit에 실수를 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 5.2231, lastId: 10 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });

      it('limit에 문자열을 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 'test', lastId: 10 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });
    });

    describe('lastId에 0 이상 정수가 아닌 값을 입력한다.', () => {
      it('lastId에 음수를 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 5, lastId: -10 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('lastId 값은 0 이상이어야 합니다.');
      });

      it('lastId에 실수를 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 5, lastId: 10.12142 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });

      it('lastId에 문자열을 입력한다.', async () => {
        const response = await request(app.getHttpServer())
          .get('/api/feed')
          .query({ limit: 5, lastId: 'test' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('정수를 입력해주세요.');
      });
    });
  });
});
