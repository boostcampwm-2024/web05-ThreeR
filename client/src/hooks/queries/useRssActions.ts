import { AxiosError } from "axios";

import { admin } from "@/api/services/admin/rss";
import { AdminResponse, AdminRequest } from "@/types/rss";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useAdminAccept = (
  onSuccess: (data: AdminResponse) => void,
  onError: (error: AxiosError<unknown, any>) => void
): UseMutationResult<AdminResponse, AxiosError<unknown, any>, AdminRequest, unknown> => {
  return useMutation<AdminResponse, AxiosError<unknown, any>, AdminRequest>({
    mutationFn: async (data) => {
      const response = await admin.acceptRss(data);
      return response;
    },
    onSuccess,
    onError,
  });
};

export const useAdminReject = (
  onSuccess: (data: AdminResponse) => void,
  onError: (error: AxiosError<unknown, any>) => void
): UseMutationResult<AdminResponse, AxiosError<unknown, any>, AdminRequest, unknown> => {
  return useMutation<AdminResponse, AxiosError<unknown, any>, AdminRequest>({
    mutationFn: async (data) => {
      const response = await admin.rejectRss(data);
      return response;
    },
    onSuccess,
    onError,
  });
};
