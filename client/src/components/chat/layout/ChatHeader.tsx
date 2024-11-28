import { Users } from "lucide-react";

import { CloseChat } from "@/components/chat/ChatButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "@/components/ui/sidebar";

import { useChatStore } from "@/store/useChatStore";

export default function ChatHeader() {
  const { userCount } = useChatStore();
  return (
    <SidebarHeader>
      <div className="flex justify-between px-2.5 py-5 items-center">
        <div className="flex gap-2">
          <b>실시간 채팅</b>
          <span>
            <Users color="gray" />
          </span>
          <Badge color="bg-secondary/70">{userCount}명 참여중</Badge>
        </div>
        <CloseChat />
      </div>
      <Separator />
    </SidebarHeader>
  );
}
