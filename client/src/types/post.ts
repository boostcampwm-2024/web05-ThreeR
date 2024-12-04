export interface Post {
  id: number;
  createdAt: string;
  title: string;
  viewCount: number;
  path: string;
  author: string;
  thumbnail?: string;
  authorImageUrl?: string;
  tags?: string[];
  likes?: number;
  blogPlatform: string;
}

export interface LatestPostsApiResponse {
  message: string;
  data: {
    result: Post[];
    hasMore: boolean;
    lastId: number | null;
  };
}

export interface TrendingPostsApiResponse {
  message: string;
  data: Post[];
}

export interface InfiniteScrollResponse<T> {
  result: T[];
  hasMore: boolean;
  lastId: number | null;
}
