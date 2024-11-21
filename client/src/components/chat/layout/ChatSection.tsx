import { useEffect, useRef } from "react";

import ChatItem from "@/components/chat/ChatItem";
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

  return (
    <ScrollArea ref={scrollRef}>
      <ul className="flex flex-col gap-5 grow">
        {chatHistory.map((item, index) => (
          <ChatItem key={index} {...item} />
        ))}
      </ul>
    </ScrollArea>
  );
}
