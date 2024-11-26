import { AxiosError } from "axios";

import { registerRss } from "@/api/services/rss";
import { RegisterRss, RegisterResponse } from "@/types/rss";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useRegisterRss = (
  onSuccess: (data: RegisterResponse) => void,
  onError: (error: AxiosError<unknown, any>) => void
): UseMutationResult<RegisterResponse, AxiosError<unknown, any>, RegisterRss, unknown> => {
  return useMutation<RegisterResponse, AxiosError<unknown, any>, RegisterRss>({
    mutationFn: registerRss,
    onSuccess,
    onError,
  });
};
