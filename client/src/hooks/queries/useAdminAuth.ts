import { AxiosError } from "axios";

import { auth } from "@/api/services/admin/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthApiRequest, AuthApiResponse } from "@/types/auth";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";

export const useAdminAuth = (
  onSuccess: (data: AuthApiResponse) => void,
  onError: (error: AxiosError<unknown, any>) => void
): UseMutationResult<AuthApiResponse, AxiosError<unknown, any>, AuthApiRequest, unknown> => {
  const setRole = useAuthStore((state) => state.setRole);
  return useMutation<AuthApiResponse, AxiosError<unknown, any>, AuthApiRequest>({
    mutationFn: async (data) => {
      const response = await auth.login(data);
      setRole("admin");
      return response;
    },
    onSuccess,
    onError,
  });
};
export const useAdminCheck = () => {
  const { status, isLoading, error } = useQuery({
    queryKey: ["adminCheck"],
    queryFn: auth.check,
    retry: 1,
  });
  return { status, isLoading, error };
};
