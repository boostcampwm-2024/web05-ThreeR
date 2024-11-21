import { view } from "@/api/services/view";
import { useQuery } from "@tanstack/react-query";

export const usePostViewIncrement = (feedId: number) => {
  return useQuery({
    queryKey: ["post-view", feedId],
    queryFn: () => view.increment(feedId),
    enabled: false,
    retry: false,
  });
};
