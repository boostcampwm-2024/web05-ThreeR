import { Feed } from '../../../src/feed/feed.entity';
import { RssAccept } from '../../../src/rss/rss.entity';

export class FeedFixture {
  static readonly GENERAL_FEED = {
    title: `Test Feed `,
    createdAt: new Date(),
    path: `http://test.com/post/`,
    thumbnail: `http://test.com/thumbnail/`,
    viewCount: 0,
  };

  static createFeedFixture(
    blog: RssAccept,
    overwrites: Partial<Feed> = {},
  ): Feed {
    const feed = new Feed();
    Object.assign(feed, { ...this.GENERAL_FEED, blog });
    Object.assign(feed, overwrites);
    return feed;
  }
}
