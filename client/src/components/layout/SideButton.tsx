import { Home } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { ChartArea } from "lucide-react";
import { CircleHelp } from "lucide-react";

import { Chat } from "@/components/chat/Chat";
import { OpenChat } from "@/components/chat/ChatButton";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SideButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex h-full items-center ">
      <SidebarProvider defaultOpen={false}>
        <Chat />
        <OpenChat />
      </SidebarProvider>
      <button className="fixed text-white bottom-[6.5rem] right-7 bg-primary hover:bg-secondary !rounded-full p-3">
        <Home size={25} />
      </button>
      <button className="fixed text-white bottom-[10.5rem] right-7 bg-[#1ABC9C] hover:bg-[#16A085] !rounded-full p-3">
        <ChartArea size={25} />
      </button>
      <button className="fixed text-white bottom-[14.5rem] right-7 bg-[#F1C40F] hover:bg-[#D4AC0D] !rounded-full p-3">
        <CircleHelp size={25} />
      </button>
      <button
        className="fixed text-white bottom-[2.5rem] right-7 bg-[#9B59B6] hover:bg-[#8E44AD] !rounded-full p-3"
        onClick={scrollToTop}
      >
        <ArrowUp size={25} />
      </button>
    </div>
  );
}