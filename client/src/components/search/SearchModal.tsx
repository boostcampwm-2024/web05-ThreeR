import SearchInput from "@/components/search/SearchHeader/SearchInput";
import FilterButton from "@/components/search/SearchFilters/FilterButton";
import SearchResultList from "@/components/search/SearchResults/SearchResultList";
import { useSearch } from "@/hooks/useSearch";
import { useState, useEffect } from "react";
import { FilterType } from "@/types/search";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [filter, setFilter] = useState<FilterType>("title");
  const [searchParam, setSearchParam] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { results } = useSearch(searchParam, filter, page, 4);
  const handleFilter = (filter: FilterType) => {
    setFilter(filter);
  };
  const handleSearchParam = (param: string) => {
    setSearchParam(param);
  };
  const handlePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 500);
  }, [filter, searchParam]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
        <SearchInput searchParam={searchParam} setSearchParam={handleSearchParam} />
        <FilterButton setFilter={handleFilter} currentFilter={filter} />
        <SearchResultList searchPost={results} page={page} setPage={handlePage} />
        <button className="mt-4 w-full bg-primary text-white py-2 rounded" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
