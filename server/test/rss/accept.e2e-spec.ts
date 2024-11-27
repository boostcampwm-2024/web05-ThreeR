import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Rss, RssAccept } from '../../src/rss/rss.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RssFixture } from './fixture/rssFixture';
import { RedisService } from '../../src/common/redis/redis.service';

describe('Rss Accept E2E Test', () => {
  let app: INestApplication;
  let rssRepository: Repository<Rss>;
  let rssAcceptRepository: Repository<RssAccept>;
  let redisService: RedisService;

  beforeAll(async () => {
    app = global.testApp;
    rssRepository = app.get<Repository<Rss>>(getRepositoryToken(Rss));
    rssAcceptRepository = app.get<Repository<RssAccept>>(
      getRepositoryToken(RssAccept),
    );
    redisService = app.get(RedisService);
  });

  beforeEach(async () => {
    await rssRepository.query('DELETE FROM rss');
    await redisService.redisClient.set('auth:sid', 'test_admin');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/rss/accept/{rssId}', () => {
    describe('정상적인 요청을 한다.', () => {
      it('정삳적으로 RSS를 승인한다.', async () => {
        // given
        const rssFixture = RssFixture.createRssFixture();
        const rss = await rssRepository.save(rssFixture);

        // when
        const response = await request(app.getHttpServer())
          .post(`/api/rss/accept/${rss.id}`)
          .set('Cookie', 'sessionId=sid')
          .send();
        const accepted = await rssAcceptRepository.findOne({
          where: { rssUrl: rss.rssUrl },
        });

        // then
        expect(response.status).toBe(201);
        expect(accepted).not.toBeNull();
      });
    });

    describe('비정상적인 요청을 한다.', () => {
      it('PathVariable이 적절하지 않을 경우', async () => {
        // when
        const response = await request(app.getHttpServer())
          .post(`/api/rss/accept/abc`)
          .set('Cookie', 'sessionId=sid')
          .send();

        // then
        expect(response.status).toBe(400);
      });

      it('존재하지 않는 rss를 승인할 때', async () => {
        // when
        const response = await request(app.getHttpServer())
          .post(`/api/rss/accept/1`)
          .set('Cookie', 'sessionId=sid')
          .send();

        // then
        expect(response.status).toBe(404);
      });

      it('유효한 세션이 존재하지 않을 때', async () => {
        // when
        const noCookieResponse = await request(app.getHttpServer())
          .post(`/api/rss/accept/1`)
          .send();

        const noSessionResponse = await request(app.getHttpServer())
          .post(`/api/rss/accept/1`)
          .set('Cookie', 'sessionId=invalid')
          .send();

        // then
        expect(noCookieResponse.status).toBe(401);
        expect(noSessionResponse.status).toBe(401);
      });
    });
  });
});
