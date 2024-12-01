import { RssReject } from '../../src/rss/rss.entity';

export class RssRejectFixture {
  static createRssRejectFixture(
    overwrites: Partial<RssReject> = {},
  ): RssReject {
    const rssReject = new RssReject();
    Object.assign(rssReject, {
      name: `blog`,
      userName: `name`,
      email: `test@test.com`,
      rssUrl: `https://example.com/rss`,
      description: 'description',
    });
    return Object.assign(rssReject, overwrites);
  }
}
