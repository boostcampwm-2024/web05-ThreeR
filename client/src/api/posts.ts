import { api, axiosInstance } from "@/api/instance";
import { InfiniteScrollResponse, PostsApiResponse, Post } from "@/types/post";

export const postsApi = {
  fetchPosts: async (params: { limit: number; lastId: number }): Promise<InfiniteScrollResponse<Post>> => {
    const instance = import.meta.env.DEV ? api : axiosInstance;
    const response = await instance.get<PostsApiResponse>("/api/feed", {
      params: {
        limit: params.limit,
        lastId: params.lastId || 0,
      },
    });
    return {
      result: response.data.data.result,
      hasMore: response.data.data.hasMore,
      lastId: response.data.data.lastId,
    };
  },
};
