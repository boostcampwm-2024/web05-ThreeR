import { axiosInstance } from "@/api/instance";
import { InfiniteScrollResponse, LatestPostsApiResponse, TrendingPostsApiResponse, Post } from "@/types/post";

export const posts = {
  trending: async (): Promise<TrendingPostsApiResponse> => {
    const response = await axiosInstance.get<TrendingPostsApiResponse>("/api/feed/trend");
    return response.data;
  },
  latest: async (params: { limit: number; lastId: number }): Promise<InfiniteScrollResponse<Post>> => {
    const response = await axiosInstance.get<LatestPostsApiResponse>("/api/feed", {
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
