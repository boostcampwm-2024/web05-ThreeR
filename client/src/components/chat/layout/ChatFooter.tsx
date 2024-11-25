import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";

import { useKeyboardShortcut } from "@/hooks/common/useKeyboardShortcut";

import { useChatValueStroe } from "@/store/useChatStore";
import { useChatStore } from "@/store/useChatStore";

export default function ChatFooter() {
  const { message, setMessage } = useChatValueStroe();
  const { sendMessage } = useChatStore();

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  useKeyboardShortcut("Enter", () => handleSendMessage(), false);

  return (
    <SheetFooter className="flex items-center gap-2">
      <Input
        placeholder="메시지를 입력하세요"
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button className="bg-black hover:bg-gray-800 text-white" onClick={handleSendMessage}>
        <Send />
      </Button>
    </SheetFooter>
  );
}
