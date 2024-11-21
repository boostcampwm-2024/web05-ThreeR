import { axiosInstance } from "@/api/instance";
import { AuthApiRequest, AuthApiResponse } from "@/types/auth";

export const auth = async (data: AuthApiRequest): Promise<AuthApiResponse> => {
  const response = await axiosInstance.post<AuthApiResponse>("/api/admin/login", data);
  return response.data;
};
