import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

type SideBarType = {
  handleRssModal: () => void;
  handleSearchModal: () => void;
  handleLoginModal: () => void;
};

export default function SideBar({ handleRssModal, handleSearchModal, handleLoginModal }: SideBarType) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button onClick={handleSearchModal} variant="outline">
        <Search />
        검색
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
