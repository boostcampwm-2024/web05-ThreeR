import { Rss } from '../../../src/rss/rss.entity';

export class RssFixture {
  static readonly GENERAL_RSS = {
    name: 'blog',
    userName: 'name',
    email: 'test@test.com',
    rssUrl: 'https://example.com/rss',
  };

  static createRssFixture(): Rss {
    return new Rss(this.GENERAL_RSS);
  }
}
