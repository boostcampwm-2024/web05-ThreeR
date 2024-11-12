import { FilterType } from "@/types/search";
import { useSearchStore } from "@/store/useSearchStore";
import { useEffect } from "react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { FileText, User, PanelBottom } from "lucide-react";

export default function FilterButton() {
  const { currentFilter, setFilter, setPage } = useSearchStore();

  useEffect(() => {
    setPage(1);
  }, [currentFilter, setPage]);

  const getItemClassName = (isActive: boolean) =>
    `rounded px-4 py-2 text-sm flex items-center gap-2 cursor-pointer ${
      isActive ? "bg-accent " : "bg-white hover:bg-gray-100 transition-colors duration-200"
    }`;

  const handleFilterClick = (filter: FilterType) => {
    setFilter(filter);
  };

  return (
    <CommandGroup heading="필터">
      <div className="flex flex-col gap-1">
        <div className={getItemClassName(currentFilter === "title")} onClick={() => handleFilterClick("title")}>
          <FileText size={16} />
          <span>제목</span>
        </div>
        <div className={getItemClassName(currentFilter === "blogger")} onClick={() => handleFilterClick("blogger")}>
          <User size={16} />
          <span>블로거</span>
        </div>
        <div className={getItemClassName(currentFilter === "all")} onClick={() => handleFilterClick("all")}>
          <PanelBottom size={16} />
          <span>블로거 + 제목</span>
        </div>
      </div>
    </CommandGroup>
  );
}
