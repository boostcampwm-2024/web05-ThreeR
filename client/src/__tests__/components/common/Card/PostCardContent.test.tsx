import { describe, it, expect } from "vitest";

import { PostCardContent } from "@/components/common/Card/PostCardContent";

import { createMockPost } from "@/__tests__/mocks/data/posts.ts";
import { render, screen } from "@testing-library/react";

describe("PostCardContent", () => {
  it("author 이미지가 있는 PostContent가 렌더링되는지 확인", () => {
    render(<PostCardContent post={createMockPost()} />);

    expect(screen.getByText("테스트 포스트")).toBeInTheDocument();
    expect(screen.getByText("작성자")).toBeInTheDocument();
    expect(screen.getByAltText("작성자")).toBeInTheDocument();
    expect(screen.getByText("2024년 3월 26일")).toBeInTheDocument();
  });

  it("avatar 이미지가 없을 때 대체 avatar가 렌더링되는지 확인", () => {
    const postWithoutImage = {
      ...createMockPost(),
      authorImageUrl: undefined,
    };

    render(<PostCardContent post={postWithoutImage} />);

    expect(screen.getByText("작")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("author 정보가 없을 때 적절하게 처리되는지 확인", () => {
    const postWithoutAuthor = {
      ...createMockPost(),
      author: "",
      authorImageUrl: undefined,
    };

    render(<PostCardContent post={postWithoutAuthor} />);

    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
