import { InfiniteScrollResponse } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseInfiniteScrollQueryOptions<T> {
  queryKey: string;
  fetchFn: (params: { limit: number; last_id?: number }) => Promise<InfiniteScrollResponse<T>>;
}

export function useInfiniteScrollQuery<T>({ queryKey, fetchFn }: UseInfiniteScrollQueryOptions<T>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = null }) =>
      fetchFn({
        limit: 12,
        last_id: pageParam as number,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: null as number | null,
  });

  const items = data?.pages.flatMap((page) => page.posts) ?? [];

  return {
    items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  };
}
