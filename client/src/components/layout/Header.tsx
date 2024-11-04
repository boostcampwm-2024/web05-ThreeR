import logo from "@/assets/logo-denamu-main.svg";
import searchIcon from "@/assets/searchIcon.svg";
import SearchModal from "../search/SearchModal";
import SideBar from "./Sidebar";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSearchModal = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSideBar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <header className="mx-7 my-5 flex justify-between items-center h-[50px] relative">
      <div className="cursor-pointer h-full">
        <img src={logo} alt="Logo" className="h-full" />
      </div>
      <div className="hidden md:flex h-full items-center gap-x-3 text-sm">
        <button className="cursor-pointer border h-full px-4 rounded flex items-center" onClick={handleSearchModal}>
          <img src={searchIcon} alt="Search" className="h-5" />
        </button>
        <button className="cursor-pointer border h-full px-3 rounded flex items-center">로그인</button>
        <button className="cursor-pointer primary-div h-full px-3 rounded text-white font-bold flex items-center">
          블로그 등록
        </button>
      </div>
      <div className="md:hidden">
        <button onClick={handleSideBar} className="cursor-pointer border px-3 rounded">
          ☰
        </button>
      </div>

      {sidebarOpen && <SideBar setSearchOpen={handleSearchModal} setSidebarOpen={handleSideBar} />}
      {searchOpen && <SearchModal onClose={handleSearchModal} />}
    </header>
  );
}
