import SearchResultItem from "./SearchResultItem";
import { useSearch } from "@/hooks/useSearch";
import { useSearchStore } from "@/store/useSearchStore";
import SearchPages from "../searchPages/SearchPages";
import { Loader } from "lucide-react";
export default function SearchResults() {
  const RESULT_PER_PAGE = 4;
  const { searchParam, currentFilter, page } = useSearchStore();
  const { results, totalPages, loading, error } = useSearch(searchParam, currentFilter, page, RESULT_PER_PAGE);

  if (loading || !results) {
    return (
      <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (results.length === 0) {
    return <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">검색결과가 없습니다</div>;
  }
  if (error) {
    <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">에러발생</div>;
  }
  return (
    <div className="flex flex-col gap-4 h-[25rem]">
      {results.map((result, index) => (
        <SearchResultItem key={index} {...result} />
      ))}
      <SearchPages totalPages={totalPages} />
    </div>
  );
}
