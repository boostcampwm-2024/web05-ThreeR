import { Post } from "@/types/post";

export const TRENDING_POSTS: Post[] = [
  {
    id: "1",
    title: "Next.js 14로 풀스택 웹 개발하기",
    description:
      "Next.js 14의 새로운 기능과 App Router를 활용한 풀스택 웹 개발 가이드. 서버 컴포넌트, 스트리밍, 캐싱 등 최신 기능들을 실제 프로젝트에 적용하는 방법을 알아봅니다.",
    author: "김개발",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "실무에서 바로 쓰는 React 성능 최적화 팁",
    description:
      "React 애플리케이션의 성능을 개선하는 실용적인 팁들을 소개합니다. 메모이제이션, 코드 스플리팅, 레이지 로딩 등 실제 프로젝트에서 활용할 수 있는 최적화 기법들을 다룹니다.",
    author: "박프론트",
    createdAt: "2024-03-14",
  },
  {
    id: "3",
    title: "TypeScript 5.0 새로운 기능 톺아보기",
    description:
      "TypeScript 5.0의 주요 변경사항과 새로운 기능들을 상세히 살펴봅니다. 실제 코드 예제와 함께 업그레이드 가이드를 제공합니다.",
    author: "이타스",
    createdAt: "2024-03-13",
  },
  {
    id: "7",
    title: "GraphQL과 Apollo로 데이터 관리하기",
    description:
      "GraphQL과 Apollo Client를 활용한 효율적인 데이터 관리 방법을 소개합니다. 쿼리, 뮤테이션, 캐싱 등 다양한 기능을 실제 예제와 함께 다룹니다.",
    author: "윤백엔드",
    createdAt: "2024-03-12",
  },
  {
    id: "8",
    title: "Docker로 개발 환경 구축하기",
    description:
      "Docker를 활용한 개발 환경 구축 방법을 알아봅니다. 컨테이너화된 애플리케이션을 통해 일관된 개발 환경을 유지하는 방법을 설명합니다.",
    author: "김도커",
    createdAt: "2024-03-11",
  },
  {
    id: "9",
    title: "Jest로 React 컴포넌트 테스트하기",
    description:
      "Jest와 React Testing Library를 활용한 React 컴포넌트 테스트 방법을 다룹니다. 유닛 테스트, 스냅샷 테스트, 통합 테스트 등 다양한 테스트 기법을 소개합니다.",
    author: "박테스트",
    createdAt: "2024-03-10",
  },
];

export const LATEST_POSTS: Post[] = [
  {
    id: "4",
    title: "AI 기반 코드 리뷰 시스템 구축하기",
    description:
      "GPT-4를 활용한 자동 코드 리뷰 시스템 구축 경험을 공유합니다. GitHub Actions와의 통합 방법과 실제 운영 사례를 소개합니다.",
    author: "정아이",
    createdAt: "2024-03-16",
  },
  {
    id: "5",
    title: "모던 CSS로 반응형 UI 구축하기",
    description:
      "CSS Grid, Flexbox, Container Queries를 활용한 현대적인 반응형 UI 구축 방법을 알아봅니다. 실제 프로젝트 예제와 함께 설명합니다.",
    author: "최디자인",
    createdAt: "2024-03-16",
  },
  {
    id: "6",
    title: "웹 성능 측정과 분석: Core Web Vitals 완벽 가이드",
    description:
      "Core Web Vitals를 통한 웹 성능 측정 방법과 최적화 전략을 다룹니다. Lighthouse, WebPageTest 등 다양한 도구 활용법을 소개합니다.",
    author: "한성능",
    createdAt: "2024-03-15",
  },
  {
    id: "10",
    title: "Kubernetes로 마이크로서비스 관리하기",
    description:
      "Kubernetes를 활용한 마이크로서비스 관리 방법을 알아봅니다. 클러스터 구성, 서비스 디스커버리, 로드 밸런싱 등 다양한 기능을 실제 예제와 함께 설명합니다.",
    author: "이쿠버",
    createdAt: "2024-03-09",
  },
  {
    id: "11",
    title: "Serverless 아키텍처로 확장성 있는 애플리케이션 구축하기",
    description:
      "AWS Lambda와 같은 Serverless 서비스를 활용한 확장성 있는 애플리케이션 구축 방법을 소개합니다. 비용 절감과 운영 효율성을 높이는 전략을 다룹니다.",
    author: "서버리스",
    createdAt: "2024-03-08",
  },
  {
    id: "12",
    title: "CI/CD 파이프라인 구축하기",
    description:
      "Jenkins와 GitHub Actions를 활용한 CI/CD 파이프라인 구축 방법을 알아봅니다. 자동화된 빌드, 테스트, 배포 과정을 통해 개발 효율성을 높이는 방법을 설명합니다.",
    author: "박파이프",
    createdAt: "2024-03-07",
  },
];
