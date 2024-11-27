import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton({ number }: { number: number }) {
  return (
    <div className="space-y-4 pb-2">
      {Array.from({ length: number }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-[120px]" />
            <Skeleton className="h-2 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
