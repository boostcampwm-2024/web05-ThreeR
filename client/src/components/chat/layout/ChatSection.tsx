import ChatItem from "@/components/chat/ChatItem";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CHAT_ITEM } from "@/constants/dummyData";

export default function ChatSection() {
  return (
    <ScrollArea>
      <ul className="flex flex-col gap-5 grow">
        {CHAT_ITEM.map((item) => {
          return <ChatItem {...item} />;
        })}
      </ul>
    </ScrollArea>
  );
}
