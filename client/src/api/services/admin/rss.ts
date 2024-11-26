import { axiosInstance } from "@/api/instance";
import { AdminRss, AdminResponse, AdminRequest } from "@/types/rss";

export const admin = {
  //대기중인 rss 정보 get
  getRss: async (): Promise<AdminRss> => {
    const response = await axiosInstance.get<AdminRss>("/api/rss");
    return response.data;
  },
  //승인된 rss 정보 get
  getAccept: async (): Promise<AdminRss> => {
    const response = await axiosInstance.get<AdminRss>("/api/rss/history/accept");
    return response.data;
  },
  //거부된 rss 정보 get
  getReject: async (): Promise<AdminRss> => {
    const response = await axiosInstance.get<AdminRss>("/api/rss/history/reject");
    return response.data;
  },
  //rss 승인
  acceptRss: async (data: AdminRequest): Promise<AdminResponse> => {
    const response = await axiosInstance.post(`/api/rss/accept/${data.id}`);
    return response.data;
  },
  //rss 거부
  rejectRss: async (data: AdminRequest): Promise<AdminResponse> => {
    const response = await axiosInstance.post(`/api/rss/reject/${data.id}`, { description: data.rejectMessage });
    return response.data;
  },
};
