import { Loader } from "lucide-react";

import { CommandList, CommandEmpty, CommandGroup } from "@/components/ui/command";

import { useSearch } from "@/hooks/useSearch";

import SearchPages from "../searchPages/SearchPages";
import SearchResultItem from "./SearchResultItem";
import { useSearchStore } from "@/store/useSearchStore";

export default function SearchResults() {
  const RESULT_PER_PAGE = 4;
  const { searchParam, currentFilter, page } = useSearchStore();
  const { results, totalPages, totalItems, loading, error } = useSearch(
    searchParam,
    currentFilter,
    page,
    RESULT_PER_PAGE
  );

  const renderContent = {
    // 검색 로딩
    loading: (
      <CommandEmpty className="flex gap-4 h-[25rem] justify-center items-center">
        <Loader />
      </CommandEmpty>
    ),
    // 검색 결과 없음
    searchEmpty: (
      <CommandEmpty className="flex  gap-4 h-[30rem] justify-center items-center">검색결과가 없습니다</CommandEmpty>
    ),
    // 에러발생
    error: <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">에러발생</div>,
    // 정상적인 상황
    default: (
      <CommandGroup heading={`검색결과 (총 ${totalItems}건)`}>
        <CommandList>
          {results.map((result, index) => (
            <SearchResultItem key={index} {...result} />
          ))}
        </CommandList>
        <SearchPages totalPages={totalPages} />
      </CommandGroup>
    ),
  };
  const getRenderKey = () => {
    if (loading || !results) return "loading";
    if (results.length === 0) return "searchEmpty";
    if (error) return "error";
    return "default";
  };

  return renderContent[getRenderKey()];
}
