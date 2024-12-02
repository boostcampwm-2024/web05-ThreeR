import { describe, expect, it, vi } from "vitest";

import SearchButton from "@/components/search/SearchButton";

import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon">Mock Search Icon</div>,
}));

describe("SearchButton", () => {
  it("버튼이 올바른 텍스트와 아이콘을 렌더링해야 한다", () => {
    const mockHandleSearchModal = vi.fn();

    render(<SearchButton handleSearchModal={mockHandleSearchModal} />);

    expect(screen.getByText("검색")).toBeInTheDocument();

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("클릭 시 handleSearchModal 함수가 호출되어야 한다", () => {
    const mockHandleSearchModal = vi.fn();

    render(<SearchButton handleSearchModal={mockHandleSearchModal} />);

    const button = screen.getByText("검색").parentElement;
    expect(button).toBeInTheDocument();
    if (button) {
      fireEvent.click(button);
    }

    expect(mockHandleSearchModal).toHaveBeenCalledTimes(1);
  });

  it("접근성을 위한 올바른 스타일과 상호작용이 가능해야 한다", () => {
    const mockHandleSearchModal = vi.fn();

    render(<SearchButton handleSearchModal={mockHandleSearchModal} />);

    const buttonElement = screen.getByText("검색").parentElement;
    expect(buttonElement).toBeInTheDocument();

    if (buttonElement) {
      expect(buttonElement).toHaveClass("cursor-pointer");
      expect(buttonElement).toHaveClass("hover:bg-primary/5");
      expect(buttonElement).toHaveClass("bg-white");
      expect(buttonElement).toHaveClass("border-primary");
      expect(buttonElement).toHaveClass("text-primary");
    }
  });
});
