import { Button } from "@/components/ui/button";

type SideBarType = {
  handleRssModal: () => void;
  handleAboutPage: () => void;
  handleLoginModal: () => void;
};

export default function SideBar({ handleRssModal, handleAboutPage, handleLoginModal }: SideBarType) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button onClick={handleAboutPage} variant="outline">
        서비스소개
      </Button>
      <Button variant="outline" className="w-full" onClick={handleLoginModal}>
        로그인
      </Button>
      <Button variant="outline" className="w-full" onClick={handleRssModal}>
        블로그 등록
      </Button>
    </div>
  );
}
