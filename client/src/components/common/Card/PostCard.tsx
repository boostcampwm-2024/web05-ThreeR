import { Image as ImageIcon } from "lucide-react";

import { LazyImage } from "@/components/common/LazyImage";
import { Card } from "@/components/ui/card";

import { PostCardContent } from "./PostCardContent";
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
      <div className="aspect-[16/9] relative bg-muted flex items-center justify-center overflow-hidden rounded-t-xl">
        {post.thumbnail ? (
          <LazyImage
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            wrapperClassName="w-full h-full"
          />
        ) : (
          <div className="text-muted-foreground">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}
      </div>

      <PostCardContent post={post} />
    </Card>
  );
};
