import { Search } from "lucide-react";

import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function SearchButton({ handleSearchModal }: { handleSearchModal: () => void }) {
  return (
    <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={handleSearchModal} href="#">
      <div className="flex items-center gap-2">
        <Search size={16} />
        <span>검색</span>
      </div>
    </NavigationMenuLink>
  );
}
