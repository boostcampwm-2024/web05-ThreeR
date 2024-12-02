import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { RedisService } from '../../../src/common/redis/redis.service';
import { RssRejectRepository } from '../../../src/rss/rss.repository';
import { RssReject } from '../../../src/rss/rss.entity';
import { RssRejectFixture } from '../../fixture/rssReject.fixture';

describe('GET /api/rss/history/reject E2E Test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = global.testApp;
    const rssRejectRepository = app.get(RssRejectRepository);
    const redisService = app.get(RedisService);
    const rssAccepts: RssReject[] = [];
    for (let i = 1; i <= 2; i++) {
      rssAccepts.push(RssRejectFixture.createRssRejectFixture({}, i));
    }
    await Promise.all([
      rssRejectRepository.save(rssAccepts),
      redisService.redisClient.sadd('auth:sid', 'test1234'),
    ]);
  });

  it('관리자 로그인이 되어있지 않으면 조회할 수 없다.', async () => {
    // when
    const response = await supertest(app.getHttpServer()).get(
      '/api/rss/history/reject',
    );

    // then
    expect(response.status).toBe(401);
  });

  it('관리자 로그인이 되어 있으면 최신순으로 기록 데이터를 응답한다.', async () => {
    // when
    const response = await supertest(app.getHttpServer())
      .get('/api/rss/history/reject')
      .set('Cookie', 'sessionId=sid');

    // then
    expect(response.status).toBe(200);
    expect(response.body.data.map((item) => item.id)).toStrictEqual([2, 1]);
  });
});