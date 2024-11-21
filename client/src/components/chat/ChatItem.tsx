import Avvvatars from "avvvatars-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { formatTime } from "@/utils/time";

import { ChatType } from "@/types/chat";

export default function ChatItem(chatItem: ChatType) {
  return (
    <div className={`flex gap-2 justify-start items-center`}>
      <Avatar>
        <Avvvatars value={chatItem.username} style="shape" />
      </Avatar>

      <div className={`flex flex-col gap-1 items-start text-left`}>
        {/* 이름, 시간 */}
        <div className="flex gap-2 items-end">
          <span className="text-sm">{chatItem.username}</span>
          <span className="text-xs">{formatTime(chatItem.timestamp)}</span>
        </div>

        {/* 채팅 내용 */}
        <Badge variant="secondary" className={`p-3 bg-gray-200 text-black`}>
          {chatItem.message}
        </Badge>
      </div>
    </div>
  );
}
