import { ChatType } from "@/types/chat";
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

export const CHAT_ITEM: ChatType[] = [
  {
    chatImg: "https://github.com/shadcn.png",
    username: "김철수",
    timestamp: "오전 9:15",
    message: "안녕하세요! 오늘 회의 시간 변동 있나요?",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "이영희",
    timestamp: "오전 9:18",
    message: "안녕하세요! 시간은 그대로예요. 10시에 시작합니다.",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "박지민",
    timestamp: "오전 9:20",
    message: "오늘 자료 준비는 다들 끝내셨나요?",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "정명기",
    timestamp: "오전 9:22",
    message: "아직 덜끝냈습니다람쥐",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "최민수",
    timestamp: "오전 9:25",
    message: "네, 방금 마지막 자료 정리했어요.",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "김지영",
    timestamp: "오전 9:27",
    message: "저도 준비 끝났습니다. 공유드릴게요.",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "정다은",
    timestamp: "오전 9:30",
    message: "혹시 오늘 회의 안건 추가된 거 있나요?",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "정명기",
    timestamp: "오전 9:22",
    message: "없습니다리미",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "오준혁",
    timestamp: "오전 9:32",
    message: "새로운 안건은 없어요. 기존에 계획한 내용 진행하면 될 것 같아요.",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "김수현",
    timestamp: "오전 9:35",
    message: "다들 준비되셨으면 시간 맞춰서 만나겠습니다!",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "이민호",
    timestamp: "오전 9:40",
    message: "확인했습니다. 조금 이따 뵐게요.",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "홍길동",
    timestamp: "오전 9:45",
    message: "회의 끝나고 나서 추가 논의 시간 가질 수 있을까요?",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "윤아름",
    timestamp: "오전 9:50",
    message: "네, 괜찮습니다. 끝나고 바로 논의하죠!",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    username: "한지민",
    timestamp: "오전 9:55",
    message: "다들 화이팅입니다!",
  },
];
