import { X } from "lucide-react";

import { useSearchStore } from "@/store/useSearchStore";

export default function SearchInput({ onClose }: { onClose: () => void }) {
  const { searchParam, setSearchParam, setPage } = useSearchStore();

  const handleSearchParam = (newParam: string) => {
    setSearchParam(newParam);
    setPage(1);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="w-full border-none outline-none rounded p-2 "
        value={searchParam}
        onChange={(e) => handleSearchParam(e.target.value)}
      />
      <button onClick={onClose}>
        <X />
      </button>
    </div>
  );
}
