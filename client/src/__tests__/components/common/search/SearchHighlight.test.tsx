import { describe, it, expect } from "vitest";

import SearchHighlight from "@/components/search/SearchHigilight.tsx";

import { render, screen } from "@testing-library/react";

describe("SearchHighlight", () => {
  it("하이라이트할 텍스트가 없을 때 원본 텍스트가 여러 span으로 나뉘어 렌더링되어야 한다", () => {
    const { container } = render(<SearchHighlight text="Hello World" highlight="" />);
    expect(container.textContent).toBe("Hello World");
  });

  it("하이라이트된 텍스트는 강조 스타일을 가져야 한다", () => {
    render(<SearchHighlight text="Hello" highlight="el" />);

    const highlightedElement = screen.getByText("el");
    expect(highlightedElement).toHaveClass("font-black", "text-black");

    expect(screen.getByText("H")).toBeInTheDocument();
    expect(screen.getByText("lo")).toBeInTheDocument();
  });

  it("하이라이트 텍스트와 정확히 일치하는 부분을 강조해야 한다", () => {
    render(<SearchHighlight text="Hello World" highlight="Hello" />);

    const highlightedText = screen.getByText("Hello");
    expect(highlightedText).toHaveClass("font-black", "text-black");
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("하이라이트 텍스트가 대소문자가 다르더라도 매칭되어야 한다", () => {
    render(<SearchHighlight text="Hello HELLO hello" highlight="hello" />);

    const highlightedTexts = screen.getAllByText(/hello/i);
    expect(highlightedTexts).toHaveLength(3);

    highlightedTexts.forEach((element) => {
      expect(element).toHaveClass("font-black", "text-black");
    });
  });

  it("하이라이트 텍스트가 여러 번 등장할 때 모두 강조되어야 한다", () => {
    render(<SearchHighlight text="Hello World Hello" highlight="Hello" />);

    const highlightedTexts = screen.getAllByText("Hello");
    expect(highlightedTexts).toHaveLength(2);

    highlightedTexts.forEach((element) => {
      expect(element).toHaveClass("font-black", "text-black");
    });
  });

  it("하이라이트 텍스트가 텍스트의 일부분일 때도 정확히 매칭되어야 한다", () => {
    render(<SearchHighlight text="HelloWorld" highlight="World" />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    const highlightedText = screen.getByText("World");
    expect(highlightedText).toHaveClass("font-black", "text-black");
  });

  // it("특수문자를 포함한 하이라이트 텍스트도 올바르게 처리해야 한다", () => {
  //   const { container } = render(<SearchHighlight text="Hello (World)" highlight="(World)" />);
  //
  //   expect(container.textContent).toBe("Hello (World)");
  //
  //   const highlightedSpans = container.querySelectorAll("span.font-black.text-black");
  //   const highlightedText = Array.from(highlightedSpans)
  //     .map((span) => span.textContent)
  //     .join("");
  //
  //   expect(highlightedText).toBe("(World)");
  //
  //   const nonHighlightedSpans = Array.from(container.querySelectorAll("span:not(.font-black)"));
  //   expect(nonHighlightedSpans[0].textContent).toBe("Hello ");
  // });
});
