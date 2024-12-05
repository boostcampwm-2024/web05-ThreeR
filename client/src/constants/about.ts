import {
  Clock,
  Layout,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  MessageSquare,
  BarChart2,
  Users,
  Trophy,
  ArrowUpCircle,
  CheckCircle2,
  Mail,
} from "lucide-react";

import { ExtraFeatureSection, Feature } from "@/types/about";

export const FEATURES: Feature[] = [
  {
    mainTitle: "함께 성장하는 블로그",
    groupTitle: `다양한 블로그 플랫폼에 있는\n기술 블로그를 한눈에 모아보세요.`,
    features: [
      {
        shortTitle: "간편한 블로그 등록",
        longTitle: "로그인 없이 빠르게 등록",
        description: `혹시 공유하고 싶은 본인만의 기술 블로그가 있나요?\n약간의 정보만 입력하면 블로그를 등록할 수 있습니다.`,
        icon: ArrowUpCircle,
        imageSrc: "https://github.com/user-attachments/assets/fec3fb65-189d-426f-9ef3-382eb205715b",
      },
      {
        shortTitle: "자동 포스트 검증",
        longTitle: "서비스에 집중할 필요 없이 게시글 발행에만 집중",
        description: `입력된 URL에서 RSS 피드를 자동으로 찾아 검증합니다.\nRSS를 주기마다 확인하고 포스트를 정상적으로 가져옵니다.`,
        icon: CheckCircle2,
        imageSrc: "https://github.com/user-attachments/assets/23717fe5-ff0d-4c8f-9ace-7c411caea58a",
      },
      {
        shortTitle: "신청 성공, 실패 시 메일 전송",
        longTitle: "비로그인으로 편리하게 확인",
        description: `신청 후 RSS 피드 확인이 완료되면 결과를 이메일로 알려드립니다.\n성공하면 성공 메일을, 반려되면 사유와 함께 안내 메일을 발송합니다.`,
        icon: Mail,
        imageSrc: "https://github.com/user-attachments/assets/41b1fc07-5b2c-459c-b015-1e6dc2ba1f2c",
      },
    ],
  },
  {
    mainTitle: "최신 기술 트렌드",
    groupTitle: "실시간으로 업데이트되는\n개발자들의 기술 이야기",
    features: [
      {
        shortTitle: "실시간 콘텐츠 업데이트",
        longTitle: "다양한 플랫폼의 기술 블로그를 한곳에서",
        description: `Tistory, Velog, Medium 등 여러 플랫폼의 기술 블로그 글을 실시간으로 확인하세요.\n개발자들의 최신 기술 포스트를 놓치지 않고 살펴볼 수 있습니다.`,
        icon: RefreshCw,
        imageSrc: "https://github.com/user-attachments/assets/6d1eecbf-4849-4435-8a7f-db8f10f2d962",
      },
      {
        shortTitle: "플랫폼 통합 지원",
        longTitle: "주요 블로그 플랫폼 모두 지원",
        description: `국내외 주요 기술 블로그 플랫폼을 지원합니다.\n플랫폼에 상관없이 모든 기술 콘텐츠를 한 곳에서 만나보세요.`,
        icon: Layout,
        imageSrc: "https://github.com/user-attachments/assets/e5144430-1dae-4b26-b967-ed9a59736a82",
      },
      {
        shortTitle: "주기적 피드 갱신",
        longTitle: "놓치지 않는 기술 트렌드",
        description: `등록된 기술 블로그에 새로운 글이 포스팅되면 주기적으로 업데이트됩니다.\n개발자들의 이야기를 한 곳에서 확인해보세요.`,
        icon: Clock,
        imageSrc: "https://github.com/user-attachments/assets/012ae7b4-da69-4966-bd4f-6a54a6fa8542",
      },
    ],
  },
  {
    mainTitle: "인기 콘텐츠 큐레이션",
    groupTitle: "개발자들이 주목하는\n가치 있는 기술 콘텐츠를 발견하세요.",
    features: [
      {
        shortTitle: "실시간 트렌드",
        longTitle: "개발자들이 주목하는 트렌드",
        description: `실시간으로 집계되는 데이터를 기반으로 순위를 제공합니다.\n지금 이 순간 주목받는 기술 트렌드를 놓치지 마세요.`,
        icon: TrendingUp,
        imageSrc: "https://github.com/user-attachments/assets/c607fb7e-9ffa-4624-9724-f8cdd8a5d4d1",
      },
    ],
  },
  {
    mainTitle: "검색",
    groupTitle: "원하는 기술 콘텐츠를\n빠르게 찾아보세요.",
    features: [
      {
        shortTitle: "통합 키워드 검색",
        longTitle: "모든 플랫폼의 기술 콘텐츠를 한 번에",
        description: `찾고 싶은 키워드만 입력하세요.\n여러 블로그 플랫폼의 콘텐츠들을 한 번에 검색할 수 있습니다.`,
        icon: Search,
        imageSrc: "https://github.com/user-attachments/assets/deeb0cb5-27c9-4284-b6cd-fdf8cc09eba6",
      },
      {
        shortTitle: "스마트 하이라이팅",
        longTitle: "원하는 내용을 한눈에 파악",
        description: `검색 결과에서 키워드를 자동으로 하이라이팅합니다.\n본문 미리보기를 통해 원하는 내용을 빠르게 찾아보세요.`,
        icon: Sparkles,
        imageSrc: "https://github.com/user-attachments/assets/11113a01-fc5f-4c76-93d9-02140b6797ee",
      },
    ],
  },
];

export const EXTRA_FEATURES: ExtraFeatureSection = {
  mainTitle: "앞으로 추가될 다양한 부가 기능",
  groupTitle: "개발자를 위한\n특별한 기능들을 만나보세요.",
  sections: [
    {
      title: "실시간 익명 채팅",
      features: [
        {
          shortTitle: "가벼운 이야기",
          description: "새로운 프로필로 자유로운 소통",
          items: ["무작위의 프로필 이미지", "부담 없는 기술 토론", "주제 별 대화 분리"],
          icon: MessageSquare,
        },
        {
          shortTitle: "실시간 토론",
          description: "다른 개발자들과 자유롭게 토론",
          items: ["실시간 기술 토론", "코드 스니펫 공유", "즉각적인 피드백"],
          icon: Users,
        },
      ],
    },
    {
      title: "다양한 통계 제공",
      features: [
        {
          shortTitle: "플랫폼 통계",
          description: "블로그 플랫폼별 통계 파악",
          items: ["플랫폼 별 사용자 수", "플랫폼 별 포스팅 현황", "플랫폼 별 조회수 순위"],
          icon: BarChart2,
        },
        {
          shortTitle: "순위 분석",
          description: "다양한 기준의 순위 확인",
          items: ["인기 기술 스택 순위", "월간 인기 블로거", "주간 트렌드 키워드"],
          icon: Trophy,
        },
      ],
    },
  ],
};
