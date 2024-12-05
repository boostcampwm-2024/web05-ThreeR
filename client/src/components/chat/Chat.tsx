import { useEffect, useState } from "react";

import ChatFooter from "@/components/chat/layout/ChatFooter";
import ChatHeader from "@/components/chat/layout/ChatHeader";
import ChatSection from "@/components/chat/layout/ChatSection";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { useChatStore } from "@/store/useChatStore";

export function Chat() {
  const { userCount, connect, disconnect, getHistory } = useChatStore();
  const [isFull, setIsFull] = useState<boolean>(false);
  // Socket 연결 관리
  useEffect(() => {
    if (userCount >= 500) {
      setIsFull(true);
    }
    connect();
    getHistory();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <Sidebar side="right" variant="floating">
      <SidebarContent>
        <ChatHeader />
        <ChatSection isFull={isFull} />
        <ChatFooter />
      </SidebarContent>
    </Sidebar>
  );
}
