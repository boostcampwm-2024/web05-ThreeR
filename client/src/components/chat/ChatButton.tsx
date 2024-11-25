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
    <button onClick={toggleSidebar} className="">
      <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex gap-2 `} href="#">
        <MessageCircleMore size={16} />
        <span>채팅</span>
      </NavigationMenuLink>
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
