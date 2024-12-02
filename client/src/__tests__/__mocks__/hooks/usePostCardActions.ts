import { vi } from "vitest";

export const mockPostCardActions = {
  usePostCardActions: () => ({
    handlePostClick: vi.fn(),
  }),
};
