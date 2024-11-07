import searchIcon from "@/assets/searchIcon.svg";

export default function SearchButton({ handleSearchModal }: { handleSearchModal: () => void }) {
  return (
    <button className="cursor-pointer border h-full px-4 rounded flex items-center" onClick={handleSearchModal}>
      <img src={searchIcon} alt="Search" className="h-5" />
    </button>
  );
}
