import { chart } from "@/api/services/chart/chart";
import { ChartResponse, ChartPlatforms } from "@/types/chart";
import { useQuery } from "@tanstack/react-query";

type ChartType = {
  chartAll: ChartResponse;
  chartToday: ChartResponse;
  chartPlatform: ChartPlatforms;
};

export const useChart = () => {
  const { data, isLoading, error } = useQuery<ChartType>({
    queryKey: ["charts"],
    queryFn: async (): Promise<ChartType> => {
      const results = await Promise.allSettled([chart.getAll(), chart.getToday(), chart.getPlatform()]);
      // 타입별 기본값 지정
      const chartAll: ChartResponse = results[0].status === "fulfilled" ? results[0].value : { message: "", data: [] };

      const chartToday: ChartResponse =
        results[1].status === "fulfilled" ? results[1].value : { message: "", data: [] };

      const chartPlatform: ChartPlatforms =
        results[2].status === "fulfilled" ? results[2].value : { message: "", data: [] };

      return {
        chartAll,
        chartToday,
        chartPlatform,
      };
    },
    refetchInterval: 1000 * 6 * 10,
    retry: 1,
  });

  return { data, isLoading, error };
};
