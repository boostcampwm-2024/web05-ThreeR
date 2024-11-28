import { axiosInstance } from "@/api/instance";
import { InfiniteScrollResponse, LatestPostsApiResponse, Post } from "@/types/post";

export const posts = {
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
