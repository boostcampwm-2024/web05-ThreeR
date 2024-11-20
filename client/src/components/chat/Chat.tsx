import ChatButton from "@/components/chat/ChatButton";
import ChatFooter from "@/components/chat/layout/ChatFooter";
import ChatHeader from "@/components/chat/layout/ChatHeader";
import ChatSection from "@/components/chat/layout/ChatSection";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
