import { describe, it, expect, vi } from "vitest";

import SearchInput from "@/components/search/SearchHeader/SearchInput";

import { useSearchStore } from "@/store/useSearchStore";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@/store/useSearchStore", () => ({
  useSearchStore: vi.fn(() => ({
    searchParam: "",
    setSearchParam: vi.fn(),
    setPage: vi.fn(),
  })),
}));

describe("SearchInput", () => {
  it("입력창과 닫기 버튼이 렌더링되어야 한다", () => {
    const onClose = vi.fn();
    render(<SearchInput onClose={onClose} />);

    expect(screen.getByPlaceholderText("검색어를 입력하세요")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("검색어 입력시 store가 업데이트되어야 한다", () => {
    const mockSetSearchParam = vi.fn();
    const mockSetPage = vi.fn();

    vi.mocked(useSearchStore).mockReturnValue({
      searchParam: "",
      setSearchParam: mockSetSearchParam,
      setPage: mockSetPage,
    });

    render(<SearchInput onClose={vi.fn()} />);

    const input = screen.getByPlaceholderText("검색어를 입력하세요");
    fireEvent.change(input, { target: { value: "테스트" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith("테스트");
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it("닫기 버튼 클릭시 onClose가 호출되어야 한다", () => {
    const onClose = vi.fn();
    render(<SearchInput onClose={onClose} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });
});
