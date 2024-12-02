import Chart from "@/components/chart/Chart";
import Layout from "@/components/layout/Layout";
import MainContent from "@/components/sections/MainContent";

import { useTapStore } from "@/store/useTapStore";

export default function Home() {
  const { tap } = useTapStore();

  const renderFunction = () => {
    if (tap === "main") return <MainContent />;
    return <Chart />;
  };
  return <Layout>{renderFunction()}</Layout>;
}
