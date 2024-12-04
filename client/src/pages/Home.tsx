import { lazy, Suspense } from "react";

import ChartSkeleton from "@/components/chart/ChartSkeleton.tsx";
import Layout from "@/components/layout/Layout";
import MainContent from "@/components/sections/MainContent";

import { useTapStore } from "@/store/useTapStore";

const ChartTab = lazy(() => import("@/components/chart/ChartTab"));

export default function Home() {
  const { tap } = useTapStore();

  const renderFunction = () => {
    if (tap === "main") return <MainContent />;
    return (
      <Suspense fallback={<ChartSkeleton />}>
        <ChartTab />)
      </Suspense>
    );
  };

  return <Layout>{renderFunction()}</Layout>;
}
