import SearchResultItem from "./SearchResultItem";
import { useSearch } from "@/hooks/useSearch";
import { useSearchStore } from "@/store/useSearchStore";
import SearchPages from "../searchPages/SearchPages";
import { Loader } from "lucide-react";
import { CommandList, CommandEmpty, CommandGroup } from "@/components/ui/command";
export default function SearchResults() {
  const RESULT_PER_PAGE = 4;
  const { searchParam, currentFilter, page } = useSearchStore();
  const { results, totalPages, totalItems, loading, error } = useSearch(
    searchParam,
    currentFilter,
    page,
    RESULT_PER_PAGE
  );

  if (loading) {
    return (
      <CommandEmpty className="flex gap-4 h-[25rem] justify-center items-center">
        <Loader />
      </CommandEmpty>
    );
  }
  if (results.length === 0) {
    return (
      <CommandEmpty className="flex  gap-4 h-[30rem] justify-center items-center">검색결과가 없습니다</CommandEmpty>
    );
  }
  if (error) {
    <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">에러발생</div>;
  }
  return (
    <CommandGroup heading={`검색결과 (총 ${totalItems}건)`}>
      <CommandList>
        {results.map((result, index) => (
          <SearchResultItem key={index} {...result} />
        ))}
      </CommandList>
      <SearchPages totalPages={totalPages} />
    </CommandGroup>
  );
}
