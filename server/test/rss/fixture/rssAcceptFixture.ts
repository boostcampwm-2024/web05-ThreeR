import { RssAccept } from '../../../src/rss/rss.entity';

export class RssAcceptFixture {
  static readonly GENERAL_RSS_ACCEPT = {
    name: 'blog',
    userName: 'name',
    email: 'test@test.com',
    rssUrl: 'https://example.com/rss',
    blogPlatform: 'etc',
  };

  static createRssAcceptFixture(
    overwrites: Partial<RssAccept> = {},
  ): RssAccept {
    const rssAccept = new RssAccept();
    Object.assign(rssAccept, this.GENERAL_RSS_ACCEPT);
    return Object.assign(rssAccept, overwrites);
  }
}
