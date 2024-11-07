import { SectionHeader } from "@/components/common/SectionHeader";
import { Rss } from "lucide-react";
import { PostCardGrid } from "@/components/common/Card/PostCardGrid";
import { LATEST_POSTS } from "@/constants/dummyData";

export default function LatestSection() {
  return (
    <section className="flex flex-col p-4 min-h-[300px]">
      <SectionHeader icon={Rss} text="최신 포스트" description="최근에 작성된 포스트" iconColor="text-orange-500" />
      <div className="flex-1 mt-4 p-4 border border-dashed border-gray-500 rounded-lg">
        <PostCardGrid posts={LATEST_POSTS} />
      </div>
    </section>
  );
}
