import { MessageCircleMore } from "lucide-react";
import { X } from "lucide-react";

import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useSidebar } from "@/components/ui/sidebar";

export default function ChatButton() {
  return <div className="flex items-center gap-2"></div>;
}
export function OpenChat() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="fixed text-white bottom-10 right-10 bg-primary hover:bg-secondary !rounded-full p-3"
    >
      <MessageCircleMore size={30} />
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
