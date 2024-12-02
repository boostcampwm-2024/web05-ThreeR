import { Feed } from '../../src/feed/feed.entity';
import { RssAccept } from '../../src/rss/rss.entity';

export class FeedFixture {
  static createFeedFixture(
    rssAccept: RssAccept,
    overwrites: Partial<Feed> = {},
    index: number = 1,
  ): Feed {
    const feed = new Feed();
    Object.assign(feed, {
      ...{
        createdAt: new Date(),
        title: `test${index}`,
        viewCount: 1,
        path: `https://test.com/test${index}`,
        thumbnail: `https://test.com/test${index}.png`,
      },
      blog: rssAccept,
    });
    return Object.assign(feed, overwrites);
  }
}
