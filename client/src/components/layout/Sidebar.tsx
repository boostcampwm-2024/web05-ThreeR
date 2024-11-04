type SideBarType = {
  setSidebarOpen: () => void;
  setSearchOpen: () => void;
};

export default function SideBar({ setSidebarOpen, setSearchOpen }: SideBarType) {
  return (
    <div className="fixed top-0 right-0 h-full w-2/4 max-w-xs bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out">
      <button onClick={setSidebarOpen} className="p-4 text-right w-full text-gray-600">
        ✕ 닫기
      </button>
      <div className="flex flex-col p-4 space-y-4 text-lg">
        <button onClick={setSearchOpen} className="text-left">
          검색
        </button>
        <button className="text-left">로그인</button>
        <button className="text-left">블로그 등록</button>
      </div>
    </div>
  );
}
