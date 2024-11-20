import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";

export default function ChatFooter() {
  return (
    <SheetFooter className="flex items-center gap-2">
      <Input placeholder="메시지를 입력하세요" className="flex-1" />
      <Button className="bg-black hover:bg-gray-800 text-white">
        <Send />
      </Button>
    </SheetFooter>
  );
}
