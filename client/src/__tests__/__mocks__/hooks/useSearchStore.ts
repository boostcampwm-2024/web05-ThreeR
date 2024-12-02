import { vi } from "vitest";

export const mockSearchStore = {
  useSearchStore: () => ({
    currentFilter: "title",
    setFilter: vi.fn(),
    setPage: vi.fn(),
    searchParam: "",
    setSearchParam: vi.fn(),
    resetPage: vi.fn(),
    resetParam: vi.fn(),
    resetFilter: vi.fn(),
  }),
};
