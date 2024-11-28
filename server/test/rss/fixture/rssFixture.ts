import { Rss } from '../../../src/rss/rss.entity';

export class RssFixture {
  static readonly GENERAL_RSS = {
    name: 'blog',
    userName: 'name',
    email: 'test@test.com',
    rssUrl: 'https://example.com/rss',
  };

  static createRssFixture(overwrites: Partial<Rss> = {}): Rss {
    const rss = new Rss();
    Object.assign(rss, this.GENERAL_RSS);
    return Object.assign(rss, overwrites);
  }
}
