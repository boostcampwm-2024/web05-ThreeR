import { Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function ChatHeader({ userCount }: { userCount: number }) {
  return (
    <SheetHeader className="pb-5">
      <SheetTitle>
        <div className="flex gap-2">
          <span>실시간 채팅</span>
          <span>
            <Users color="gray" />
          </span>
          <Badge color="bg-secondary/70">{userCount}명 참여중</Badge>
        </div>
      </SheetTitle>
      <Separator />
    </SheetHeader>
  );
}
