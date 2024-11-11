export interface SearchData {
  id: number;
  title: string;
  author: string;
  description?: string;
}
export type FilterType = "title" | "blogger" | "all";
