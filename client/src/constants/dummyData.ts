import { Post } from "@/types/post";

export const TRENDING_POSTS: Post[] = [
  {
    id: 1,
    createdAt: new Date().toISOString(),
    title: "Next.js 14로 풀스택 웹 개발하기",
    viewCount: 0,
    path: "/",
    author: "김개발",
    thumbnail: "https://picsum.photos/640/480?random=101",
  },
  {
    id: 2,
    createdAt: new Date().toISOString(),
    title: "실무에서 바로 쓰는 React 성능 최적화 팁",
    viewCount: 0,
    path: "/",
    author: "박프론트",
    thumbnail: "https://picsum.photos/640/480?random=102",
  },
  {
    id: 3,
    createdAt: new Date().toISOString(),
    title: "TypeScript 5.0 새로운 기능 톺아보기",
    viewCount: 0,
    path: "/",
    author: "이타스",
    thumbnail: "https://picsum.photos/640/480?random=103",
  },
  {
    id: 7,
    createdAt: new Date().toISOString(),
    title: "GraphQL과 Apollo로 데이터 관리하기",
    viewCount: 0,
    path: "/",
    author: "윤백엔드",
    thumbnail: "https://picsum.photos/640/480?random=104",
  },
];
