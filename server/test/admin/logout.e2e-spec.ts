import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { RedisService } from '../../src/common/redis/redis.service';

describe('POST /api/admin/logout E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.testApp;
    const redisService = app.get(RedisService);
    await redisService.redisClient.sadd('auth:sid', 'test1234');
  });

  it('관리자 로그인이 되어 있으면 로그아웃을 정상적으로 할 수 있다.', async () => {
    // when
    const response = await supertest(app.getHttpServer())
      .post('/api/admin/logout')
      .set('Cookie', 'sessionId=sid');

    // then
    expect(response.status).toBe(200);
    expect(response.header['set-cookie']).toStrictEqual([
      'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]);
  });

  it('관리자 로그인이 되어 있지 않으면 로그아웃을 정상적으로 할 수 없다.', async () => {
    // when
    const response = await supertest(app.getHttpServer()).post(
      '/api/admin/logout',
    );

    // then
    expect(response.status).toBe(401);
  });
});
