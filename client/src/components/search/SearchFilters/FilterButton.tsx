import { FilterType } from "@/types/search";

type FilterButtonType = {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const filters: { label: string; value: FilterType }[] = [
  { label: "게시글 제목", value: "title" },
  { label: "블로거", value: "blogger" },
  { label: "블로그 이름", value: "blogName" },
];

export default function FilterButton({ currentFilter, setFilter }: FilterButtonType) {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => {
        return (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={`rounded px-4 py-2 text-sm ${currentFilter === filter.value ? "bg-primary text-white" : "bg-gray-200"}`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
