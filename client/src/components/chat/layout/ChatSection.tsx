import { useEffect, useRef } from "react";

import ChatItem from "@/components/chat/ChatItem";
import ChatSkeleton from "@/components/chat/layout/ChatSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useChatStore } from "@/store/useChatStore";

export default function ChatSection({ isFull }: { isFull: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { chatHistory } = useChatStore();
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContent = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContent) {
        scrollContent.scrollTo({
          top: scrollContent.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [chatHistory]);

  const RenderHistory = () => {
    if (chatHistory.length === 0) return <ChatSkeleton number={14} />;
    return isFull ? (
      <div className="flex flex-col h-full pb-2 px-2">
        <p>채팅창 인원이 500명 이상입니다</p>
        <p>잠시 기다렸다가 새로고침을 해주세요</p>
      </div>
    ) : (
      <ul className="flex flex-col gap-5 grow pb-2 px-2">
        {chatHistory.map((item, index) => (
          <ChatItem key={index} {...item} />
        ))}
      </ul>
    );
  };

  return <ScrollArea ref={scrollRef}>{RenderHistory()}</ScrollArea>;
}
