import { TrendingUp } from "lucide-react";

import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { SectionHeader } from "@/components/common/SectionHeader";
import AnimatedPostGrid from "@/components/sections/AnimatedPostGrid";

import { useTrendingPosts } from "@/hooks/queries/useTrendingPosts";

export default function TrendingSection() {
  const { posts, isLoading } = useTrendingPosts();

  if (isLoading) return <LoadingIndicator />;

  return (
    <section className="flex flex-col p-4 min-h-[300px]">
      <SectionHeader
        icon={TrendingUp}
        text="트렌딩 포스트"
        description="지난 주 가장 인기있던 포스트"
        iconColor="text-red-500"
      />
      <div
        className="flex-1 mt-4 p-6 bg-white rounded-2xl transition-all duration-300"
        style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }}
      >
        <AnimatedPostGrid posts={posts} />
      </div>
    </section>
  );
}
