import { api } from "@/api/instance";
import { InfiniteScrollResponse, PostsApiResponse, Post } from "@/types/post";

export const postsApi = {
  fetchPosts: async (params: { limit: number; last_id?: number }): Promise<InfiniteScrollResponse<Post>> => {
    const response = await api.get<PostsApiResponse>("/posts", { params });
    return {
      posts: response.data.data.result,
      hasMore: response.data.data.last_id !== null,
      nextPage: response.data.data.last_id,
    };
  },
};
