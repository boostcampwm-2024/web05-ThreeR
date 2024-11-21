import { useEffect } from "react";

import ChatButton from "@/components/chat/ChatButton";
import ChatFooter from "@/components/chat/layout/ChatFooter";
import ChatHeader from "@/components/chat/layout/ChatHeader";
import ChatSection from "@/components/chat/layout/ChatSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useChatStore } from "@/store/useChatStore";

export function Chat() {
  const { chatHistory, userCount, connect, disconnect, getHistory } = useChatStore();

  // Socket 연결 관리
  useEffect(() => {
    connect();
    getHistory();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <ChatButton />
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full">
        <ChatHeader userCount={userCount} />
        <ChatSection chatHistory={chatHistory} />
        <ChatFooter />
      </SheetContent>
    </Sheet>
  );
}
