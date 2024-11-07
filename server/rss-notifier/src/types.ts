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
    rss: string;
    title: string;
    link: string;
    imageUrl: string;
}