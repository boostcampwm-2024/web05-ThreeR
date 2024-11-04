import { Post } from "@/types/post";
import { Image as ImageIcon } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="flex flex-col rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] relative bg-gray-100 flex items-center justify-center">
        {post.thumbnailUrl ? (
          <img src={post.thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400">
            <ImageIcon className="w-8 h-8" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
        <div className="text-sm text-gray-500">{post.author}</div>
      </div>
    </div>
  );
};
