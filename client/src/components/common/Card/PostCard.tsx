import { Image as ImageIcon } from "lucide-react";

import { LazyImage } from "@/components/common/LazyImage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { formatDate } from "@/utils/date";

import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
  const authorInitial = post.author?.charAt(0)?.toUpperCase() || "?";

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

      <CardContent className="p-0">
        <div className="relative -mt-6 ml-4 mb-3">
          <Avatar className="h-8 w-8 ring-2 ring-background cursor-pointer">
            {post.authorImageUrl ? (
              <img src={post.authorImageUrl} alt={post.author} className="w-full h-full object-cover" />
            ) : (
              <AvatarFallback className="text-xs bg-slate-200">{authorInitial}</AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="px-4 pb-4">
          <p className="font-semibold text-xs text-gray-500 pb-1">{post.author}</p>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-gray-400 pt-3">{formatDate(post.createdAt)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
