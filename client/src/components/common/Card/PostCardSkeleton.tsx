import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="h-[240px] bg-white rounded-lg p-4 space-y-3 shadow-sm">
      <Skeleton className="w-full h-40 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

const PostGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { PostCardSkeleton, PostGridSkeleton };
