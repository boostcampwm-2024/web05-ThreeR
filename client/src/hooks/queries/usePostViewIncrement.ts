import { view } from "@/api/services/view";
import { useMutation } from "@tanstack/react-query";

export const usePostViewIncrement = (feedId: number) => {
  return useMutation({
    mutationFn: () => view.increment(feedId),
  });
};
