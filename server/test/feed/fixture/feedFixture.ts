import { Feed } from '../../../src/feed/feed.entity';
import { RssAccept } from '../../../src/rss/rss.entity';

export class FeedFixture {
  static readonly GENERAL_FEED = {
    createdAt: new Date(),
    title: 'test',
    viewCount: 1,
    path: 'https://test.com/test',
    thumbnail: 'https://test.com/test.png',
  };

  static createFeedFixture(
    rssAccept: RssAccept,
    overwrites: Partial<Feed> = {},
  ): Feed {
    const feed = new Feed();
    Object.assign(feed, { ...this.GENERAL_FEED, rssAccept });
    return Object.assign(feed, overwrites);
  }
}
