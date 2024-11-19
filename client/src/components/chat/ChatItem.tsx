import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type ChatType = {
  chatImg: string;
  chatName: string;
  chatTime: string;
  chatContent: string;
};

export default function ChatItem(chatItem: ChatType) {
  return (
    <div className="chat-item flex gap-5">
      {/* 이미지 */}
      <Avatar>
        <AvatarImage src={chatItem.chatImg} />
      </Avatar>
      <div className="flex flex-col gap-1">
        {/* 이름, 시간 */}
        <div className="flex gap-2 items-end">
          <span className="text-sm">{chatItem.chatName}</span>
          <span className="text-xs">{chatItem.chatTime}</span>
        </div>
        {/* 채팅 내용 */}
        <Badge variant="secondary" className="p-3">
          {chatItem.chatContent}
        </Badge>
      </div>
    </div>
  );
}
