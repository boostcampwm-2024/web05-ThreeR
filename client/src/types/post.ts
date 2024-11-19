export interface Post {
  id: number;
  title: string;
  description?: string;
  author: string;
  createdAt: string;
  tags?: string[];
  likes?: number;
  views?: number;
  thumbnailUrl?: string;
  authorImageUrl?: string;
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
