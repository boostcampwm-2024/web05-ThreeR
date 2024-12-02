import { axiosInstance } from "@/api/instance";
import { ChartResponse, ChartPlatforms } from "@/types/chart";

export const chart = {
  //금일 조회수
  getToday: async (): Promise<ChartResponse> => {
    const response = await axiosInstance.get<ChartResponse>("/api/statistic/today?limit=5");
    return response.data;
  },
  //전체 조회수
  getAll: async (): Promise<ChartResponse> => {
    const response = await axiosInstance.get<ChartResponse>("/api/statistic/all?limit=5");
    return response.data;
  },
  //금일 조회수
  getPlatform: async (): Promise<ChartPlatforms> => {
    const response = await axiosInstance.get<ChartPlatforms>("/api/statistic/platform");
    return response.data;
  },
};
