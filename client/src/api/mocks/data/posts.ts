import { Post } from "@/types/post";

const PAGE_SIZE = 12;

export const generateMockPost = (id: number): Post => ({
  id: id.toString(),
  title: `블로그 포스트 #${id}`,
  author: `작성자 ${(id % 5) + 1}`,
  thumbnailUrl: `https://picsum.photos/640/480?random=${id}`,
  createdAt: new Date(Date.now() - id * 86400000).toISOString(),
});

export const TOTAL_POSTS = Array.from({ length: 100 }, (_, i) => generateMockPost(i + 1));
export const PAGE_SIZE_POSTS = PAGE_SIZE;
