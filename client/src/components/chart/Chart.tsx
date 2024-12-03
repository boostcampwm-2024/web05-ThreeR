import BarChartItem from "@/components/chart/BarChartItem";
import ChartSkeleton from "@/components/chart/ChartSkeleton";
import PieChartItem from "@/components/chart/PieChartItem";

import { useChart } from "@/hooks/queries/useChart";

export default function Chart() {
  const { data, isLoading, error } = useChart();
  if (!data || isLoading) return <ChartSkeleton />;
  if (error) return <p>Error loading data</p>;
  const { chartAll, chartToday, chartPlatform } = data;

  return (
    <div className="p-8">
      <div className="flex">
        <BarChartItem title="전체 조회수" description="전체 조회수 TOP5" data={chartAll.data} color={true} />
        <BarChartItem title="오늘의 조회수" description="금일 조회수 TOP5" data={chartToday.data} color={false} />
      </div>
      <div>
        <PieChartItem data={chartPlatform.data} title="플랫폼별 블로그 수" />
      </div>
    </div>
  );
}
