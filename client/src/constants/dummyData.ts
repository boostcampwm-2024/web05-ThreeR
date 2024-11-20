import { ChatType } from "@/types/chat";
import { Post } from "@/types/post";

export const TRENDING_POSTS: Post[] = [
  {
    id: 1,
    title: "Next.js 14로 풀스택 웹 개발하기",
    author: "김개발",
    createdAt: "2024-03-15",
    thumbnailUrl: "https://picsum.photos/640/480?random=101",
  },
  {
    id: 2,
    title: "실무에서 바로 쓰는 React 성능 최적화 팁",
    author: "박프론트",
    createdAt: "2024-03-14",
    thumbnailUrl: "https://picsum.photos/640/480?random=102",
  },
  {
    id: 3,
    title: "TypeScript 5.0 새로운 기능 톺아보기",
    author: "이타스",
    createdAt: "2024-03-13",
    thumbnailUrl: "https://picsum.photos/640/480?random=103",
  },
  {
    id: 7,
    title: "GraphQL과 Apollo로 데이터 관리하기",
    author: "윤백엔드",
    createdAt: "2024-03-12",
    thumbnailUrl: "https://picsum.photos/640/480?random=104",
  },
];

export const CHAT_ITEM: ChatType[] = [
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "김철수",
    chatTime: "오전 9:15",
    chatContent: "안녕하세요! 오늘 회의 시간 변동 있나요?",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "이영희",
    chatTime: "오전 9:18",
    chatContent: "안녕하세요! 시간은 그대로예요. 10시에 시작합니다.",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "박지민",
    chatTime: "오전 9:20",
    chatContent: "오늘 자료 준비는 다들 끝내셨나요?",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "정명기",
    chatTime: "오전 9:22",
    chatContent: "아직 덜끝냈습니다람쥐",
    chatOther: false,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "최민수",
    chatTime: "오전 9:25",
    chatContent: "네, 방금 마지막 자료 정리했어요.",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "김지영",
    chatTime: "오전 9:27",
    chatContent: "저도 준비 끝났습니다. 공유드릴게요.",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "정다은",
    chatTime: "오전 9:30",
    chatContent: "혹시 오늘 회의 안건 추가된 거 있나요?",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "정명기",
    chatTime: "오전 9:22",
    chatContent: "없습니다리미",
    chatOther: false,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "오준혁",
    chatTime: "오전 9:32",
    chatContent: "새로운 안건은 없어요. 기존에 계획한 내용 진행하면 될 것 같아요.",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "김수현",
    chatTime: "오전 9:35",
    chatContent: "다들 준비되셨으면 시간 맞춰서 만나겠습니다!",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "이민호",
    chatTime: "오전 9:40",
    chatContent: "확인했습니다. 조금 이따 뵐게요.",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "홍길동",
    chatTime: "오전 9:45",
    chatContent: "회의 끝나고 나서 추가 논의 시간 가질 수 있을까요?",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "윤아름",
    chatTime: "오전 9:50",
    chatContent: "네, 괜찮습니다. 끝나고 바로 논의하죠!",
    chatOther: true,
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "한지민",
    chatTime: "오전 9:55",
    chatContent: "다들 화이팅입니다!",
    chatOther: true,
  },
];
