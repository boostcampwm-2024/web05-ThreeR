import { useEffect } from "react";

import ChatFooter from "@/components/chat/layout/ChatFooter";
import ChatHeader from "@/components/chat/layout/ChatHeader";
import ChatSection from "@/components/chat/layout/ChatSection";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

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
    <Sidebar side="right">
      <SidebarContent className="flex flex-col h-full w-full">
        <ChatHeader userCount={userCount} />
        <ChatSection chatHistory={chatHistory} />
        <ChatFooter />
      </SidebarContent>
    </Sidebar>
  );
}
