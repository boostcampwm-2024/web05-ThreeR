import { api } from "@/api/instance";
import { InfiniteScrollResponse, PostsApiResponse, Post } from "@/types/post";

export const postsApi = {
  fetchPosts: async (params: { limit: number; last_id: number }): Promise<InfiniteScrollResponse<Post>> => {
    const response = await api.get<PostsApiResponse>("/api/feed", {
      params: {
        limit: params.limit,
        lastId: params.last_id || 0,
      },
    });
    return {
      result: response.data.data.result,
      hasMore: response.data.data.hasMore,
      lastId: response.data.data.lastId,
    };
  },
};
