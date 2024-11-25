import { axiosInstance } from "@/api/instance";
import { AdminRss, AdminResponse, AdminRequest } from "@/types/rss";

export const admin = {
  getRss: async (): Promise<AdminRss> => {
    const response = await axiosInstance.get("/api/rss");
    return response.data;
  },
  getAccept: async (): Promise<AdminRss> => {
    const response = await axiosInstance.get("/api/rss/history/accept");
    return response.data;
  },
  getReject: async (): Promise<AdminRss> => {
    const response = await axiosInstance.get("/api/rss/history/reject");
    return response.data;
  },

  acceptRss: async (data: AdminRequest): Promise<AdminResponse> => {
    const response = await axiosInstance.post(`/api/rss/accept/${data.id}`);
    return response.data;
  },
  rejectRss: async (data: AdminRequest): Promise<AdminResponse> => {
    const response = await axiosInstance.delete(`/api/rss/reject/${data.id}`);
    return response.data;
  },
};
