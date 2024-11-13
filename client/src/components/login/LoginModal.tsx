import FormInput from "@/components/RssRegistration/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LoginModal({ onClose, loginOpen }: { onClose: () => void; loginOpen: boolean }) {
  return (
    <Dialog open={loginOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>아래 양식에 맞춰 로그인을 진행해 주세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormInput
            id="rss"
            label="ID"
            onChange={() => {
              console.log("id");
            }}
            placeholder="아이디를 입력해주세요."
            value={""}
          />
          <FormInput
            id="rss"
            label="Password"
            onChange={() => {
              console.log("id");
            }}
            placeholder="비밀번호를 입력해주세요."
            value={""}
          />
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
            로그인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
