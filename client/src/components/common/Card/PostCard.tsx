import { Card } from "@/components/ui/card";

import { PostCardContent } from "./PostCardContent";
import { PostCardImage } from "./PostCardImage";
import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
  const handleClick = () => {
    if (post.path) {
      window.open(post.path, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-none rounded-xl cursor-pointer",
        className
      )}
    >
      <PostCardImage thumbnail={post.thumbnail} alt={post.title} />
      <PostCardContent post={post} />
    </Card>
  );
};
