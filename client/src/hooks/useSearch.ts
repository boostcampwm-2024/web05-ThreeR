import axios from "axios";
import { useState, useEffect } from "react";
import { SearchPost } from "@/constants/dummySearchData";
import { SearchData } from "@/types/search";
import { debounce } from "@/utils/debounce";
type FilterType = "title" | "blogger" | "blogName";

const fetchSearchResults = async () => {
  const response = await axios.get("../constants/dummySearchData.ts");
  const data = await response.data;

  console.log(data);
};

export const useSearch = (query: string, filter: FilterType, page: number, pageSize: number) => {
  const [results, setResults] = useState<SearchData[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = SearchPost.filter((item) => {
          if (filter === "title") return item.title.includes(query);
          if (filter === "blogger") return item.author.includes(query);
          return false;
        }).slice(startIndex, endIndex);
        setResults(paginatedData);
      } catch (error) {
        setError("데이터를 가져오는 데 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }, 500);
    fetchData();
  }, [query, filter, page, pageSize]);
  return { results, loading, error };
};
