import { useEffect, useRef } from "react";

import ChatItem from "@/components/chat/ChatItem";
import ChatSkeleton from "@/components/chat/layout/ChatSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ChatType } from "@/types/chat";

export default function ChatSection({ chatHistory }: { chatHistory: ChatType[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    return (
      <ul className="flex flex-col gap-5 grow pb-2 px-2">
        {chatHistory.map((item, index) => (
          <ChatItem key={index} {...item} />
        ))}
      </ul>
    );
  };

  return <ScrollArea ref={scrollRef}>{RenderHistory()}</ScrollArea>;
}
