import { useSearchStore } from "@/store/useSearchStore";
import { useEffect } from "react";
import { X } from "lucide-react";
export default function SearchInput({ onClose }: { onClose: () => void }) {
  const { searchParam, setSearchParam, setPage } = useSearchStore();

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 500);
  }, [searchParam]);

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full border-none outline-none rounded p-2 "
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <button onClick={onClose}>
        <X />
      </button>
    </div>
  );
}
