import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { RssAcceptRepository } from '../../src/rss/rss.repository';
import { FeedRepository } from '../../src/feed/feed.repository';
import { RssAcceptFixture } from '../fixture/rssAccept.fixture';
import { FeedFixture } from '../fixture/feed.fixture';
import { Feed } from '../../src/feed/feed.entity';

describe('All view count statistic E2E Test : GET /api/statistic/all', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = global.testApp;
    const rssAcceptRepository = app.get(RssAcceptRepository);
    const feedRepository = app.get(FeedRepository);
    const [blog] = await Promise.all([
      rssAcceptRepository.save(RssAcceptFixture.createRssAcceptFixture()),
    ]);
    const feeds: Feed[] = [];
    for (let i = 1; i <= 2; i++) {
      feeds.push(FeedFixture.createFeedFixture(blog, { viewCount: i - 1 }, i));
    }
    await feedRepository.save(feeds);
  });

  it('값을 입력 하지 않는다.', async () => {
    // when
    const response = await request(app.getHttpServer()).get(
      '/api/statistic/all',
    );

    // then
    expect(response.status).toBe(200);
    expect(response.body.data.map((item) => item.id)).toStrictEqual([2, 1]);
  });
  it('양수를 입력한다.', async () => {
    // when
    const response = await request(app.getHttpServer()).get(
      '/api/statistic/all?limit=1',
    );

    // then
    expect(response.status).toBe(200);
    expect(response.body.data.map((item) => item.id)).toStrictEqual([2]);
  });
});
