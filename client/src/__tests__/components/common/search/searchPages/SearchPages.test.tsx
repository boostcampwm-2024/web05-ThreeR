import { describe, it, expect, vi } from "vitest";

import SearchPages from "@/components/search/searchPages/SearchPages";

import { useSearchStore } from "@/store/useSearchStore";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@/store/useSearchStore", () => ({
  useSearchStore: vi.fn(() => ({
    page: 1,
    setPage: vi.fn(),
  })),
}));

describe("SearchPages", () => {
  it("페이지네이션 컨트롤이 정상적으로 렌더링되어야 한다", () => {
    render(<SearchPages totalPages={5} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("현재 페이지에 border 스타일이 적용되어야 한다", () => {
    render(<SearchPages totalPages={5} />);

    const currentPage = screen.getByText("1").closest("button");
    expect(currentPage).toHaveClass("border");
  });

  it("페이지 이동시 store가 업데이트되어야 한다", () => {
    const mockSetPage = vi.fn();
    vi.mocked(useSearchStore).mockReturnValue({
      page: 1,
      setPage: mockSetPage,
    });

    render(<SearchPages totalPages={5} />);

    // Next 버튼 클릭
    fireEvent.click(screen.getByText("Next"));
    expect(mockSetPage).toHaveBeenCalledWith(2);

    // 특정 페이지 클릭
    fireEvent.click(screen.getByText("3"));
    expect(mockSetPage).toHaveBeenCalledWith(3);
  });

  it("첫 페이지에서 Previous 클릭시 페이지 변경이 일어나지 않아야 한다", () => {
    const mockSetPage = vi.fn();
    vi.mocked(useSearchStore).mockReturnValue({
      page: 1,
      setPage: mockSetPage,
    });

    render(<SearchPages totalPages={5} />);

    fireEvent.click(screen.getByText("Previous"));
    expect(mockSetPage).not.toHaveBeenCalled();
  });
});
