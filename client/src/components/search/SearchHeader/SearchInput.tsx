import { useSearchStore } from "@/store/useSearchStore";
import { useEffect } from "react";
export default function SearchInput() {
  const { searchParam, setSearchParam, setPage } = useSearchStore();

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 500);
  }, [searchParam]);

  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full border rounded p-2"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
    </div>
  );
}
