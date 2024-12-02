import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RedisService } from '../../src/common/redis/redis.service';
import { RssAcceptRepository } from '../../src/rss/rss.repository';
import { RssAcceptFixture } from '../fixture/rssAccept.fixture';

describe('Blog platform count statistic E2E Test : GET /api/statistic/platform', () => {
  let app: INestApplication;
  let rssAcceptRepository: RssAcceptRepository;
  beforeAll(async () => {
    app = global.testApp;
    const redisService = app.get(RedisService);
    rssAcceptRepository = app.get(RssAcceptRepository);
    await redisService.redisClient.set('auth:test1234', 'test');
  });

  beforeEach(async () => {
    await rssAcceptRepository
      .createQueryBuilder()
      .delete()
      .from('rss_accept')
      .execute();
  });

  it('데이터가 올바르게 출력된다.', async () => {
    await rssAcceptRepository.save(RssAcceptFixture.createRssAcceptFixture({}));
    await rssAcceptRepository.save(
      RssAcceptFixture.createRssAcceptFixture({}, 2),
    );
    await rssAcceptRepository.save(
      RssAcceptFixture.createRssAcceptFixture({ blogPlatform: 'velog' }, 3),
    );
    const response = await request(app.getHttpServer()).get(
      '/api/statistic/platform',
    );
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      message: '블로그 플랫폼 통계 조회 완료',
      data: [
        {
          platform: 'etc',
          count: 2,
        },
        {
          platform: 'velog',
          count: 1,
        },
      ],
    });
  });
  it('데이터가 없다.', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/statistic/platform',
    );
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      message: '블로그 플랫폼 통계 조회 완료',
      data: [],
    });
  });
});
