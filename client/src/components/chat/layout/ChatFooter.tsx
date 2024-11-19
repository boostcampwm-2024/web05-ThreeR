import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetFooter } from "@/components/ui/sheet";

export default function ChatFooter() {
  return (
    <SheetFooter>
      <Input />
      <Button>
        <Send />
      </Button>
    </SheetFooter>
  );
}
