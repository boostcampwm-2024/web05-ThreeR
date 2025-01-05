import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { Rss, RssAccept } from '../../src/rss/rss.entity';
import { RssFixture } from '../fixture/rss.fixture';
import { RedisService } from '../../src/common/redis/redis.service';
import {
  RssAcceptRepository,
  RssRepository,
} from '../../src/rss/rss.repository';

describe('Rss Accept E2E Test', () => {
  let app: INestApplication;
  let rssRepository: Repository<Rss>;
  let rssAcceptRepository: Repository<RssAccept>;
  let redisService: RedisService;

  beforeAll(async () => {
    app = global.testApp;
    rssRepository = app.get(RssRepository);
    rssAcceptRepository = app.get(RssAcceptRepository);
    redisService = app.get(RedisService);
  });

  beforeEach(async () => {
    await Promise.all([
      rssRepository.delete({}),
      redisService.redisClient.set('auth:sid', 'test_admin'),
    ]);
  });

  describe('POST /api/rss/accept/{rssId}', () => {
    describe('정상적인 요청을 한다.', () => {
      it('정상적으로 RSS를 승인한다.', async () => {
        // given
        const rssFixture = RssFixture.createRssFixture({
          rssUrl: 'https://v2.velog.io/rss/@seok3765',
        });
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
