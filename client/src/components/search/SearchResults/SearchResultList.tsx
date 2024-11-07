import { button, p } from "framer-motion/client";
import SearchResultItem from "./SearchResultItem";
import { SearchData } from "@/types/search";
type SearchResultsProps = {
  searchPost: SearchData[] | undefined;
  page: number;
  setPage: (page: number) => void;
};
const pageNumber: number[] = [1, 2, 3, 4];
export default function SearchResults({ searchPost, page, setPage }: SearchResultsProps) {
  if (!searchPost) {
    return <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">로딩중..</div>;
  }
  if (searchPost.length === 0) {
    return <div className="flex flex-col gap-4 h-[25rem] justify-center items-center">검색결과가 없습니다</div>;
  }
  return (
    <div className="flex flex-col gap-4 h-[25rem]">
      {searchPost.map((result, index) => (
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
