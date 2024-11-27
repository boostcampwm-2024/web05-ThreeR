import { AxiosError } from "axios";

import { auth } from "@/api/services/admin/auth";
import { register } from "@/api/services/admin/register";
import { useAuthStore } from "@/store/useAuthStore";
import { RegisterRequest, RegisterResponse } from "@/types/admin";
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

export const useAdminRegister = (
  onSuccess: (data: RegisterResponse) => void,
  onError: (error: AxiosError<unknown, any>) => void
): UseMutationResult<RegisterResponse, AxiosError<unknown, any>, RegisterRequest, unknown> => {
  return useMutation<RegisterResponse, AxiosError<unknown, any>, RegisterRequest>({
    mutationFn: async (data) => {
      const response = await register.register(data);
      return response;
    },
    onSuccess,
    onError,
  });
};
