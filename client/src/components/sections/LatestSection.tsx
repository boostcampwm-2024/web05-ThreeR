import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Rss } from "lucide-react";
import { PostCardGrid } from "@/components/common/Card/PostCardGrid";
import { Post } from "@/types/post";
import { fetchPosts } from "@/services/mockApi";
import { LoadingIndicator } from "../common/LoadingIndicator";

const fetchPostsAdapter = async (page: number) => {
  const response = await fetchPosts(page);
  return {
    data: response.posts,
    hasMore: response.hasMore,
  };
};

export default function LatestSection() {
  const { items: posts, loading, observerTarget } = useInfiniteScroll<Post>({ fetchData: fetchPostsAdapter });

  return (
    <section className="flex flex-col p-4 min-h-[300px]">
      <SectionHeader icon={Rss} text="최신 포스트" description="최근에 작성된 포스트" iconColor="text-orange-500" />
      <div className="flex-1 mt-4 p-4 border border-dashed border-gray-500 rounded-lg">
        <PostCardGrid posts={posts} />
        <div ref={observerTarget} className="h-10 flex items-center justify-center mt-4">
          {loading && <LoadingIndicator />}
        </div>
      </div>
    </section>
  );
}
