export interface RawFeed {
  title: string;
  link: string;
  pubDate: string;
}

export interface FeedObj {
  id: number;
  rss_url: string;
}

export interface FeedDetail {
  blog_id: number;
  pub_date: string;
  title: string;
  link: string;
  imageUrl: string;
}
