import { MessageCircleMore } from "lucide-react";
import { X } from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";

export default function ChatButton() {
  return <div className="flex items-center gap-2"></div>;
}
export function OpenChat() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="fixed text-white bottom-[14.5rem] right-7 bg-[#3498DB] hover:bg-[#2980B9] !rounded-full p-3"
    >
      <MessageCircleMore size={25} />
    </button>
  );
}
export function CloseChat() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar}>
      <X size={16} />
    </button>
  );
}
