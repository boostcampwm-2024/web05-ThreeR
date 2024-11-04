import SearchResultItem from "./SearchResultItem";
import { SearchPost } from "@/constants/dummySearchData";

export default function SearchResults() {
  return (
    <div className="flex flex-col gap-4">
      {SearchPost.map((result, index) => (
        <SearchResultItem key={index} {...result} />
      ))}
    </div>
  );
}
