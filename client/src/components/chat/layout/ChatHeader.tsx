import { Users } from "lucide-react";

import { CloseChat } from "@/components/chat/ChatButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "@/components/ui/sidebar";

export default function ChatHeader({ userCount }: { userCount: number }) {
  return (
    <SidebarHeader>
      <div className="flex justify-between p-2.5 items-center">
        <div className="flex gap-2">
          <span>실시간 채팅</span>
          <span>
            <Users color="gray" />
          </span>
          <Badge variant="secondary">{userCount}명 참여중</Badge>
        </div>
        <CloseChat />
      </div>
      <Separator />
    </SidebarHeader>
  );
}
