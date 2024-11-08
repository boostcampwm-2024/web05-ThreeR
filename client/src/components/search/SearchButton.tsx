import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import searchIcon from "@/assets/searchIcon.svg";

export default function SearchButton({ handleSearchModal }: { handleSearchModal: () => void }) {
  return (
    <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={handleSearchModal} href="#">
      <div className="flex items-center gap-2">
        <img src={searchIcon} alt="Search" className="h-4 w-4" />
        <span>검색</span>
      </div>
    </NavigationMenuLink>
  );
}
