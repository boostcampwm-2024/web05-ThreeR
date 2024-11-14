export interface Post {
  id: string;
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
    last_id: number | null;
  };
}

export interface InfiniteScrollResponse<T> {
  posts: T[];
  hasMore: boolean;
  nextPage: number | null;
}
