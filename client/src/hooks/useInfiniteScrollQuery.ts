import { useInfiniteQuery } from "@tanstack/react-query";

interface FetchResponse<T> {
  posts: T[];
  hasMore: boolean;
  nextPage: number | null;
}

interface UseInfiniteScrollQueryOptions<T> {
  queryKey: string;
  fetchFn: (page: number) => Promise<FetchResponse<T>>;
}

export function useInfiniteScrollQuery<T>({ queryKey, fetchFn }: UseInfiniteScrollQueryOptions<T>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
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
