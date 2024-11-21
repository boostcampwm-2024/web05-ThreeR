import ChatItem from "@/components/chat/ChatItem";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ChatType } from "@/types/chat";

export default function ChatSection({ chatHistory }: { chatHistory: ChatType[] }) {
  console.log(chatHistory);
  return (
    <ScrollArea>
      <ul className="flex flex-col gap-5 grow">
        {chatHistory.map((item) => {
          return <ChatItem {...item} />;
        })}
      </ul>
    </ScrollArea>
  );
}
