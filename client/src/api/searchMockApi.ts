import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { SearchData } from "@/types/search";

const mock = new MockAdapter(axios);

const mockData: SearchData[] = [
  { id: 1, title: "Next.js 13 마이그레이션 가이드", author: "토스 테크" },
  { id: 2, title: "Spring Boot 3.0 업데이트 내용", author: "우아한형제들 기술블로그" },
  { id: 3, title: "React 18에서 알아야 할 새로운 기능들", author: "네이버 D2" },
  { id: 4, title: "TypeScript로 더 안전한 코드 작성하기", author: "카카오 엔터프라이즈" },
  { id: 5, title: "Node.js 성능 최적화 기법", author: "라인 테크" },
  { id: 6, title: "Flutter를 활용한 크로스 플랫폼 앱 개발", author: "배달의민족 기술 블로그" },
  { id: 7, title: "Kubernetes로 애플리케이션 배포 자동화하기", author: "삼성 SDS" },
  { id: 8, title: "GraphQL 도입 후의 장단점", author: "넷플릭스 기술 블로그" },
  { id: 9, title: "Python으로 머신러닝 모델 학습시키기", author: "구글 AI 연구소" },
  { id: 10, title: "Docker로 개발 환경 구성하기", author: "AWS 개발자 블로그" },
  { id: 11, title: "Vue 3 컴포지션 API 완벽 가이드", author: "토스 테크" },
  { id: 12, title: "Serverless 아키텍처로 서버 비용 절감하기", author: "쿠팡 테크 블로그" },
  { id: 13, title: "GitHub Actions로 CI/CD 파이프라인 구축하기", author: "페이스북 개발자 블로그" },
  { id: 14, title: "Python 3.10 새로운 기능 소개", author: "네이버 AI 연구소" },
  { id: 15, title: "Jest와 React Testing Library로 테스트 자동화하기", author: "카카오페이 기술 블로그" },
  { id: 16, title: "Spring Security로 안전한 API 만들기", author: "우아한형제들 기술블로그" },
  { id: 17, title: "Rust 프로그래밍 언어의 매력", author: "애플 개발자 블로그" },
  { id: 18, title: "데이터 시각화를 위한 D3.js 튜토리얼", author: "라인 테크" },
  { id: 19, title: "알고리즘 효율성 향상을 위한 Python 최적화 기법", author: "네이버 D2" },
  { id: 20, title: "React Native로 모바일 앱 개발하기", author: "토스 테크" },
  { id: 21, title: "인공지능과 빅데이터의 미래", author: "구글 AI 연구소" },
  { id: 22, title: "비동기 프로그래밍과 이벤트 루프 이해하기", author: "네이버 D2" },
  { id: 23, title: "3D 게임 개발을 위한 Unity 기초", author: "유니티 코리아" },
  { id: 24, title: "마이크로서비스 아키텍처 구축하기", author: "아마존 웹 서비스" },
  { id: 25, title: "서버리스 컴퓨팅의 장단점", author: "MS Azure 블로그" },
  { id: 26, title: "웹 개발자를 위한 REST API 가이드", author: "네이버 D2" },
  { id: 27, title: "고성능 API를 위한 GraphQL 최적화", author: "넷플릭스 기술 블로그" },
  { id: 28, title: "보안 강화를 위한 암호화 기술", author: "삼성 SDS" },
  { id: 29, title: "클라우드 네이티브 앱 개발하기", author: "아마존 웹 서비스" },
  { id: 30, title: "인증 및 권한 부여의 기초", author: "MS Azure 블로그" },
  { id: 31, title: "웹 성능 최적화를 위한 Lazy Loading", author: "구글 개발자 블로그" },
  { id: 32, title: "SEO를 위한 페이지 최적화 전략", author: "네이버 검색 블로그" },
  { id: 33, title: "React 컴포넌트의 재사용성 극대화", author: "페이스북 개발자 블로그" },
  { id: 34, title: "TypeScript를 활용한 대규모 프로젝트 관리", author: "카카오 엔터프라이즈" },
  { id: 35, title: "머신러닝 모델을 위한 데이터 전처리 기법", author: "네이버 AI 연구소" },
  { id: 36, title: "안드로이드 개발자를 위한 Kotlin 기본기", author: "구글 개발자 블로그" },
  { id: 37, title: "게임 개발에서의 물리 엔진 활용", author: "유니티 코리아" },
  { id: 38, title: "CSS Flexbox와 Grid를 이용한 레이아웃", author: "구글 개발자 블로그" },
  { id: 39, title: "JavaScript 비동기 처리 심화", author: "네이버 D2" },
  { id: 40, title: "백엔드에서의 데이터베이스 최적화", author: "토스 테크" },
  { id: 41, title: "멀티 스레드 프로그래밍의 기초", author: "MS Azure 블로그" },
  { id: 42, title: "리눅스 커맨드라인 기초", author: "삼성 SDS" },
  { id: 43, title: "데이터 과학자를 위한 Python 라이브러리", author: "구글 AI 연구소" },
  { id: 44, title: "정적 사이트 생성기 사용법", author: "네이버 검색 블로그" },
  { id: 45, title: "웹 브라우저의 렌더링 과정", author: "구글 개발자 블로그" },
  { id: 46, title: "프론트엔드에서의 상태 관리", author: "카카오페이 기술 블로그" },
  { id: 47, title: "Jupyter Notebook으로 데이터 분석하기", author: "네이버 AI 연구소" },
  { id: 48, title: "Android Jetpack을 활용한 앱 개발", author: "구글 개발자 블로그" },
  { id: 49, title: "게임 그래픽 최적화", author: "유니티 코리아" },
  { id: 50, title: "프로덕션 레디 코드 작성법", author: "AWS 개발자 블로그" },
  { id: 51, title: "풀스택 개발자의 기술 스택", author: "네이버 D2" },
  { id: 52, title: "React Context API로 글로벌 상태 관리", author: "페이스북 개발자 블로그" },
  { id: 53, title: "OAuth를 이용한 소셜 로그인 구현", author: "카카오 엔터프라이즈" },
  { id: 54, title: "데이터 시각화 도구의 비교", author: "구글 AI 연구소" },
  { id: 55, title: "프로그래밍에서의 메모리 관리", author: "삼성 SDS" },
  { id: 56, title: "웹 접근성 최적화 가이드", author: "네이버 검색 블로그" },
  { id: 57, title: "함수형 프로그래밍과 JavaScript", author: "구글 개발자 블로그" },
  { id: 58, title: "CSS 애니메이션 활용하기", author: "페이스북 개발자 블로그" },
  { id: 59, title: "Docker와 컨테이너 오케스트레이션", author: "AWS 개발자 블로그" },
  { id: 60, title: "Node.js로 RESTful API 만들기", author: "토스 테크" },
  { id: 61, title: "Kotlin을 활용한 웹 개발", author: "MS Azure 블로그" },
  { id: 62, title: "웹 보안을 위한 HTTPS 설정", author: "삼성 SDS" },
  { id: 63, title: "오픈 소스 프로젝트 기여하기", author: "페이스북 개발자 블로그" },
  { id: 64, title: "네트워크 기초: TCP/IP 이해하기", author: "네이버 D2" },
  { id: 65, title: "알고리즘과 데이터 구조의 기초", author: "구글 개발자 블로그" },
  { id: 66, title: "대용량 데이터 처리와 NoSQL", author: "아마존 웹 서비스" },
  { id: 67, title: "GraphQL을 활용한 데이터 처리", author: "넷플릭스 기술 블로그" },
  { id: 68, title: "서버리스와 클라우드 컴퓨팅", author: "AWS 개발자 블로그" },
  { id: 69, title: "DevOps와 지속적 통합", author: "네이버 D2" },
  { id: 70, title: "모바일 웹 최적화 가이드", author: "구글 개발자 블로그" },
  { id: 71, title: "데이터 파이프라인 설계", author: "네이버 AI 연구소" },
  { id: 72, title: "JavaScript 디자인 패턴", author: "카카오 엔터프라이즈" },
  { id: 73, title: "React Hooks의 심화 활용", author: "페이스북 개발자 블로그" },
  { id: 74, title: "CSS Variables와 Custom Properties", author: "구글 개발자 블로그" },
  { id: 75, title: "데이터 마이닝과 머신러닝", author: "구글 AI 연구소" },
  { id: 76, title: "대규모 시스템의 트랜잭션 관리", author: "MS Azure 블로그" },
  { id: 77, title: "리눅스 시스템 관리자 기초", author: "삼성 SDS" },
  { id: 78, title: "웹 프레임워크의 종류와 비교", author: "네이버 D2" },
  { id: 79, title: "컴파일러와 인터프리터 이해하기", author: "구글 개발자 블로그" },
  { id: 80, title: "Vue와 React의 비교", author: "네이버 D2" },
  { id: 81, title: "로봇 공학과 인공지능", author: "구글 AI 연구소" },
  { id: 82, title: "프로젝트 관리 도구 활용", author: "MS Azure 블로그" },
  { id: 83, title: "3D 렌더링과 게임 엔진의 이해", author: "유니티 코리아" },
  { id: 84, title: "웹 개발에서의 보안 취약점", author: "삼성 SDS" },
  { id: 85, title: "앱 개발자를 위한 사용자 경험 설계", author: "네이버 D2" },
  { id: 86, title: "API 성능 측정과 최적화", author: "구글 개발자 블로그" },
  { id: 87, title: "함수형 언어의 개념과 활용", author: "페이스북 개발자 블로그" },
  { id: 88, title: "대규모 시스템 아키텍처 설계", author: "아마존 웹 서비스" },
  { id: 89, title: "AI와 클라우드 컴퓨팅", author: "구글 AI 연구소" },
  { id: 90, title: "PWA와 오프라인 앱 개발", author: "네이버 D2" },
  { id: 91, title: "데이터 스트리밍과 실시간 분석", author: "카카오 엔터프라이즈" },
  { id: 92, title: "브라우저와 자바스크립트 엔진", author: "구글 개발자 블로그" },
  { id: 93, title: "타입스크립트와 데이터 타입", author: "페이스북 개발자 블로그" },
  { id: 94, title: "멀티 클라우드 환경 설정", author: "MS Azure 블로그" },
  { id: 95, title: "머신러닝 모델 배포와 유지관리", author: "구글 AI 연구소" },
  { id: 96, title: "네이티브 앱과 하이브리드 앱 비교", author: "카카오 엔터프라이즈" },
  { id: 97, title: "컴퓨터 비전과 이미지 처리", author: "구글 AI 연구소" },
  { id: 98, title: "서버리스 아키텍처의 비용 절감", author: "AWS 개발자 블로그" },
  { id: 99, title: "Vue와 React의 장단점 비교", author: "토스 테크" },
  { id: 100, title: "빅데이터 분석 기초", author: "네이버 D2" },
];

mock.onGet("/api/search").reply((config) => {
  const { find, type, limit = 4, page = 1 } = config.params;

  let filteredData = mockData.filter((item) => {
    if (type === "title") {
      return item.title.includes(find);
    } else if (type === "blogger") {
      return item.author.includes(find);
    } else {
      return item.author.includes(find) || item.title.includes(find);
    }
  });

  const total_count = filteredData.length;
  const total_pages = Math.ceil(total_count / limit);

  const startIndex = (page - 1) * limit;
  const limitedData = filteredData.slice(startIndex, startIndex + limit);

  return [
    200,
    {
      status: 200,
      data: limitedData,
      page,
      total_count,
      total_pages,
    },
  ];
});
