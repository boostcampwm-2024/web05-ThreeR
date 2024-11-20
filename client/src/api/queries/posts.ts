import { api, axiosInstance } from "@/api/instance";
import { InfiniteScrollResponse, LatestPostsApiResponse, TrendingPostsApiResponse, Post } from "@/types/post";

const instance = import.meta.env.DEV ? api : axiosInstance;

export const posts = {
  trending: async (): Promise<TrendingPostsApiResponse> => {
    const { data } = await instance.get<TrendingPostsApiResponse>("/api/feed/trend");
    return data;
  },
  latest: async (params: { limit: number; lastId: number }): Promise<InfiniteScrollResponse<Post>> => {
    const response = await instance.get<LatestPostsApiResponse>("/api/feed", {
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
