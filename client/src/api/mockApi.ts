import { Post } from "@/types/post";

const PAGE_SIZE = 12;

const generateMockPost = (id: number): Post => ({
  id: id.toString(),
  title: `블로그 포스트 #${id}`,
  author: `작성자 ${(id % 5) + 1}`,
  thumbnailUrl: `https://picsum.photos/640/480?random=${id}`,
  createdAt: new Date(Date.now() - id * 86400000).toISOString(),
});

const TOTAL_POSTS = Array.from({ length: 100 }, (_, i) => generateMockPost(i + 1));

interface FetchPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextPage: number | null;
}

export const fetchPosts = async (page: number = 1): Promise<FetchPostsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const posts = TOTAL_POSTS.slice(start, end);
  const hasMore = end < TOTAL_POSTS.length;

  return {
    posts,
    hasMore,
    nextPage: hasMore ? page + 1 : null,
  };
};
