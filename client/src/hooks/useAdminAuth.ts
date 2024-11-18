import { AxiosError } from "axios";

import { adminAuth } from "@/api/queries/adminAuthApi";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthApiRequest, AuthApiResponse } from "@/types/auth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useAdminAuth = (
  onSuccess: (data: AuthApiResponse) => void,
  onError: (error: AxiosError<unknown, any>) => void
): UseMutationResult<AuthApiResponse, AxiosError<unknown, any>, AuthApiRequest, unknown> => {
  const setRole = useAuthStore((state) => state.setRole);
  return useMutation<AuthApiResponse, AxiosError<unknown, any>, AuthApiRequest>({
    mutationFn: async (data) => {
      const response = await adminAuth(data);
      setRole("admin");
      return response;
    },
    onSuccess,
    onError,
  });
};
