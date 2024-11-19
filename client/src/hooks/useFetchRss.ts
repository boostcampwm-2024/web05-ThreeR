import { adminRss } from "@/api/queries/adminRssApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchRss = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminRss"],
    queryFn: adminRss,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchInterval: 1000 * 5,
  });
  return { data, isLoading, error };
};
