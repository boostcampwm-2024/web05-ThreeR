export interface RawFeed {
  title: string;
  link: string;
  pubDate: string;
}

export interface RssObj {
  id: number;
  rssUrl: string;
}

export interface FeedDetail {
  blogId: number;
  pubDate: string;
  title: string;
  link: string;
  imageUrl: string;
}
