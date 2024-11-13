import axios from "axios";
import { useState, useEffect } from "react";
import { SearchData } from "@/types/search";
import { debounce } from "@/utils/debounce";

type FilterType = "title" | "blogger" | "all";

export const useSearch = (query: string, filter: FilterType, page: number, pageSize: number) => {
  const [results, setResults] = useState<SearchData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = debounce(async () => {
      try {
        const response = await axios.get("/api/search", {
          params: {
            find: query,
            type: filter,
            limit: pageSize,
            page: page,
          },
        });
        const { data } = response;
        setResults(data.data);
        setTotalPages(data.total_pages);
        setTotalItems(data.total_count);
      } catch (error) {
        setError("데이터를 가져오는 데 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }, 500);

    fetchData();
  }, [query, filter, page, pageSize]);

  return { results, loading, error, totalPages, totalItems };
};
