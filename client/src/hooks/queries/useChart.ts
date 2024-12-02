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
    queryFn: async () => {
      const [chartAll, chartToday, chartPlatform] = await Promise.all([
        chart.getAll(),
        chart.getToday(),
        chart.getPlatform(),
      ]);
      return { chartAll, chartToday, chartPlatform };
    },
    retry: 1,
  });

  return { data, isLoading, error };
};
