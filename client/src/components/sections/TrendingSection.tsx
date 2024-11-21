import { TrendingUp } from "lucide-react";

import { PostCardGrid } from "@/components/common/Card/PostCardGrid";
import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { SectionHeader } from "@/components/common/SectionHeader";

import { useTrendingPosts } from "@/hooks/useTrendingPosts";

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
      <div className="flex-1 mt-4 p-4 border border-dashed border-gray-500 rounded-lg">
        <PostCardGrid posts={posts} />
      </div>
    </section>
  );
}
