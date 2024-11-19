import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RejectModalProps {
  blogName?: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export const RejectModal = ({ blogName, onSubmit, onCancel }: RejectModalProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onSubmit();
    setReason("");
  };

  return (
    <>
      <Dialog open={!!blogName} onOpenChange={() => onCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>거부 사유 입력</DialogTitle>
          </DialogHeader>
          {blogName && <p className="text-sm text-muted-foreground">블로그: {blogName}</p>}
          <Textarea
            placeholder="거부 사유를 입력하세요..."
            className="min-h-[120px]"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={onCancel}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleSubmit} disabled={!reason.trim()}>
              거부하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
