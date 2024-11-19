import ChatItem from "@/components/chat/ChatItem";

type ChatType = {
  chatImg: string;
  chatName: string;
  chatTime: string;
  chatContent: string;
};

const CHAT_ITEM: ChatType[] = [
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "John Doe",
    chatTime: "10:30 AM",
    chatContent: "Hello, how are you?",
  },
  {
    chatImg: "https://github.com/shadcn.png",
    chatName: "Jane Doe",
    chatTime: "11:00 AM",
    chatContent: "I'm good, thank you!",
  },
];

export default function ChatSection() {
  return (
    <ul className="flex flex-col gap-5 grow">
      {CHAT_ITEM.map((item) => {
        return <ChatItem {...item} />;
      })}
    </ul>
  );
}
