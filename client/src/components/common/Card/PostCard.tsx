import { Image as ImageIcon } from "lucide-react";

import { LazyImage } from "@/components/common/LazyImage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
  const authorInitial = post.author?.charAt(0)?.toUpperCase() || "?";

  return (
    <Card
      className={cn(
        "group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-none rounded-xl",
        className
      )}
    >
      <div className="aspect-[16/9] relative bg-muted flex items-center justify-center overflow-hidden rounded-t-xl">
        {post.thumbnailUrl ? (
          <LazyImage
            src={post.thumbnailUrl}
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
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 ring-2 ring-background cursor-pointer">
                  {post.authorImageUrl ? (
                    <LazyImage
                      src={post.authorImageUrl}
                      alt={post.author}
                      className="w-full h-full object-cover"
                      wrapperClassName="w-full h-full"
                    />
                  ) : (
                    <AvatarFallback className="text-xs bg-slate-200">{authorInitial}</AvatarFallback>
                  )}
                </Avatar>
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>
                <p>{post.author}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="px-4 pb-4 space-y-2">
          <h3 className="font-medium text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">{post.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
