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
}

export interface PostsApiResponse {
  message: string;
  data: {
    result: Post[];
    hasMore: boolean;
    lastId: number | null;
  };
}

export interface InfiniteScrollResponse<T> {
  result: T[];
  hasMore: boolean;
  lastId: number | null;
}
