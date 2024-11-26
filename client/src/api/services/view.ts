import { axiosInstance } from "@/api/instance";

interface ViewResponse {
  message: number;
}

export const view = {
  increment: async (feedId: number): Promise<ViewResponse> => {
    const response = await axiosInstance.get(`/api/feed/${feedId}`);
    return response.data;
  },
};
