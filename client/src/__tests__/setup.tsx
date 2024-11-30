import { vi } from "vitest";

import { mockLazyImage } from "@/__tests__/__mocks__/components/common/LazyImage.tsx";
import { mockAvatar } from "@/__tests__/__mocks__/components/ui/Avatar.tsx";
import { mockCard } from "@/__tests__/__mocks__/components/ui/Card.tsx";
import { mockCommand } from "@/__tests__/__mocks__/components/ui/Command.tsx";
import { mockPagination } from "@/__tests__/__mocks__/components/ui/Pagination.tsx";
import { mockLucideIcons } from "@/__tests__/__mocks__/external/lucide-react.tsx";
import { mockPostCardActions } from "@/__tests__/__mocks__/hooks/usePostCardActions.ts";
import { mockDate } from "@/__tests__/__mocks__/utils/date.ts";
import { mockIntersectionObserver } from "@/__tests__/__mocks__/utils/observers.ts";
import "@testing-library/jest-dom";

window.IntersectionObserver = mockIntersectionObserver;

vi.mock("@/components/ui/Card", () => mockCard);
vi.mock("@/components/ui/Avatar", () => mockAvatar);
vi.mock("@/components/ui/Command", () => mockCommand);
vi.mock("@/components/ui/pagination", () => mockPagination);
vi.mock("@/components/common/LazyImage", () => mockLazyImage);
vi.mock("@/hooks/common/usePostCardActions", () => mockPostCardActions);
vi.mock("@/utils/date", () => mockDate);
vi.mock("lucide-react", () => mockLucideIcons);
