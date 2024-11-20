export interface SearchResult {
  id: number;
  title: string;
  blogName: string;
  path: string;
  createdAt: string;
}

interface SearchData {
  totalCount: number;
  result: SearchResult[];
  totalPages: number;
}

export interface SearchResponse {
  data: SearchData;
  message: string;
}
export interface SearchRequest {
  query: string;
  filter: FilterType;
  page: number;
  pageSize: number;
}
export type FilterType = "title" | "blogName" | "all";
