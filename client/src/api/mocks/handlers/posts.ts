import { mock } from "@/api/mocks/mockSetup";
import { TOTAL_POSTS, PAGE_SIZE_POSTS } from "@/api/mocks/data/posts";

export const setupPostHandlers = () => {
  mock.onGet("/posts").reply((config) => {
    const page = Number(config.params?.page) || 1;
    const start = (page - 1) * PAGE_SIZE_POSTS;
    const end = start + PAGE_SIZE_POSTS;
    const posts = TOTAL_POSTS.slice(start, end);
    const hasMore = end < TOTAL_POSTS.length;

    return [
      200,
      {
        posts,
        hasMore,
        nextPage: hasMore ? page + 1 : null,
      },
    ];
  });
};
