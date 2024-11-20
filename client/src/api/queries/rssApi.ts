import { axiosInstance } from "@/api/instance";
import { RegisterRss } from "@/types/rss";
import { RegisterResponse } from "@/types/rss";

export const registerRss = async (data: RegisterRss): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>("/api/rss", data);
  return response.data;
};
