import { axiosInstance } from "@/api/instance";
import { AuthApiRequest, AuthApiResponse } from "@/types/auth";

export const auth = {
  login: async (data: AuthApiRequest): Promise<AuthApiResponse> => {
    const response = await axiosInstance.post<AuthApiResponse>("/api/admin/login", data);
    return response.data;
  },
  check: async (): Promise<number> => {
    const response = await axiosInstance.get<AuthApiResponse>("/api/admin/sessionId");
    return response.status;
  },
  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>("api/admin/logout");
    return response.data;
  },
};
