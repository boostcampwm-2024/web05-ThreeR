import { api } from "@/api/instance";
import type { Post } from "@/types/post";

interface PostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextPage: number | null;
}

export const postsApi = {
  fetchPosts: async (page: number = 1): Promise<PostsResponse> => {
    const response = await api.get<PostsResponse>("/posts", {
      params: { page },
    });
    return response.data;
  },
};
