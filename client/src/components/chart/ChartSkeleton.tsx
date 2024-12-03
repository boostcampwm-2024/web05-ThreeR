import BarChartItem from "@/components/chart/BarChartItem";
import PieChartItem from "@/components/chart/PieChartItem";

export default function ChartSkeleton() {
  return (
    <div className="p-8">
      <div className="flex">
        <BarChartItem title="전체 조회수" description="전체 조회수 TOP5" data={[]} color={true} />
        <BarChartItem title="오늘의 조회수" description="금일 조회수 TOP5" data={[]} color={false} />
      </div>
      <div>
        <PieChartItem data={[]} title="플랫폼별 블로그 수" />
      </div>
    </div>
  );
}
