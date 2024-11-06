import SearchResultItem from "./SearchResultItem";
import { useSearch } from "@/hooks/useSearch";
import { useSearchStore } from "@/store/useSearchStore";

const pageNumber: number[] = [1, 2, 3, 4];
export default function SearchResults() {
  const resultPerPage = 4;
  const { searchParam, currentFilter, page, setPage } = useSearchStore();
  const { results, loading, error } = useSearch(searchParam, currentFilter, page, resultPerPage);

  if (loading || !results) {
    return <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">로딩중..</div>;
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
      <div className="flex justify-center gap-1">
        {pageNumber.map((number) => {
          return (
            <button
              key={number}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                page === number ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setPage(number);
              }}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
