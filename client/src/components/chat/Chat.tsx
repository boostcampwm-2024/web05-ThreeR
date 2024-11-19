import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import ChatButton from "./ChatButton";
import ChatFooter from "./layout/ChatFooter";
import ChatHeader from "./layout/ChatHeader";
import ChatSection from "./layout/ChatSection";

export function Chat() {
  return (
    <Sheet>
      <SheetTrigger>
        <ChatButton />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <ChatHeader />
        <ChatSection />
        <ChatFooter />
      </SheetContent>
    </Sheet>
  );
}
