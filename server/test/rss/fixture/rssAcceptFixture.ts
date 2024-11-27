import { RssAccept } from '../../../src/rss/rss.entity';

export class RssAcceptFixture {
  static readonly GENERAL_RSS_ACCEPT = {
    name: 'blog',
    userName: 'name',
    email: 'test@test.com',
    rssUrl: 'https://example.com/rss',
    blogPlatform: 'etc',
  };

  static createRssAcceptFixture(): RssAccept {
    return new RssAccept(this.GENERAL_RSS_ACCEPT);
  }
}
