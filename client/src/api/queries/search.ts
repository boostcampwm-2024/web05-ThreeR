import { axiosInstance } from "@/api/instance";
import { SearchRequest, SearchResponse } from "@/types/search";

export const getSearch = async (data: SearchRequest): Promise<SearchResponse> => {
  const response = await axiosInstance.get("/api/feed/search", {
    params: {
      find: data.query,
      type: data.filter,
      page: data.page,
      limit: data.pageSize,
    },
  });
  return response.data;
};
