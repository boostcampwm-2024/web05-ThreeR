import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { ChatType } from "@/types/chat";

export default function ChatItem(chatItem: ChatType) {
  const isMyMessage = !chatItem.chatOther;

  return (
    <div className={`flex gap-2 ${isMyMessage ? "justify-end" : "justify-start"} items-center`}>
      {!isMyMessage && (
        <Avatar>
          <AvatarImage src={chatItem.chatImg} />
        </Avatar>
      )}

      <div className={`flex flex-col gap-1 ${isMyMessage ? "items-end text-right" : "items-start text-left"}`}>
        {/* 이름, 시간 */}
        <div className="flex gap-2 items-end">
          {!isMyMessage && <span className="text-sm">{chatItem.chatName}</span>}
          <span className="text-xs">{chatItem.chatTime}</span>
        </div>

        {/* 채팅 내용 */}
        <Badge
          variant="secondary"
          className={`p-3 ${isMyMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
        >
          {chatItem.chatContent}
        </Badge>
      </div>

      {isMyMessage && (
        <Avatar>
          <AvatarImage src={chatItem.chatImg} />
        </Avatar>
      )}
    </div>
  );
}
