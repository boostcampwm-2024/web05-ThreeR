import { useEffect } from "react";

import { posts } from "@/api/services/posts";
import { TrendingPostsApiResponse } from "@/types/post";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrendingPosts = () => {
  const queryClient = useQueryClient();

  const query = useQuery<TrendingPostsApiResponse, Error>({
    queryKey: ["trending-posts"],
    queryFn: posts.trending,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const eventSource = new EventSource("https://api.denamu.shop/api/feed/trend/sse");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        queryClient.setQueryData(["trending-posts"], data);
      } catch (e) {
        console.error("SSE 데이터 파싱 에러: ", e);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  return {
    ...query,
    posts: query.data?.data || [],
  };
};
