export interface RawFeed {
  title: string;
  link: string;
  pubDate: string;
}

export interface RssObj {
  id: number;
  rssUrl: string;
  blogName: string;
  blogPlatform: string;
}

export interface FeedDetail {
  id: number;
  blogId: number;
  blogName: string;
  blogPlatform: string;
  pubDate: string;
  title: string;
  link: string;
  imageUrl: string;
}
