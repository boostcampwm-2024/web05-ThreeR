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
      <div className="flex justify-between p-2.5 items-center">
        <div className="flex gap-2">
          <span>실시간 채팅</span>
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
