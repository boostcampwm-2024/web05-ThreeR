import { axiosInstance } from "@/api/instance";
import { RegisterRequest, RegisterResponse } from "@/types/admin";

export const register = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>("/api/admin/register", data);
    return response.data;
  },
};
