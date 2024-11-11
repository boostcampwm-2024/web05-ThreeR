import { Loader2 } from "lucide-react";

export const LoadingIndicator = () => {
  return (
    <div className="h-12 flex items-center justify-center gap-3 mt-4">
      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      <p className="text-gray-500 text-sm font-medium">포스트를 불러오는 중...</p>
    </div>
  );
};
