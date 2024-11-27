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

  static customFeedFixture(
    title: string,
    path: string,
    rssAccept: RssAccept,
  ): Feed {
    const feedData = {
      ...this.GENERAL_FEED,
      title,
      path,
      blog: rssAccept,
    };

    return new Feed(feedData);
  }

  static createFeedFixture(rssAccept: RssAccept): Feed {
    const feedData = {
      ...this.GENERAL_FEED,
      blog: rssAccept,
    };

    return new Feed(feedData);
  }
}
