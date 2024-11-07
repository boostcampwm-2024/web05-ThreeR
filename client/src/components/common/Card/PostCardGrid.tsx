import { Post } from "@/types/post";
import { PostCard } from "./PostCard";

interface PostCardGridProps {
  posts: Post[];
}

export const PostCardGrid = ({ posts }: PostCardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};
