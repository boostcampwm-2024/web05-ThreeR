import { posts } from "@/api/services/posts";
import { useQuery } from "@tanstack/react-query";

export const usePlatform = (platform: string) => {
  const { data, isLoading, error } = useQuery<string, Error>({
    queryKey: ["platform"],
    queryFn: async () => {
      const response = await posts.blogPlatform(platform);
      return response;
    },
    enabled: !!platform,
  });
  return { data, isLoading, error };
};
