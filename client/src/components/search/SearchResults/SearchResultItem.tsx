import SearchHighlight from "@/components/search/SearchHigilight";
import { CommandItem } from "@/components/ui/command";

import { useSearchStore } from "@/store/useSearchStore";
import { SearchData } from "@/types/search";

export default function SearchResultItem({ title, userName, path }: SearchData) {
  const { searchParam } = useSearchStore();
  return (
    <CommandItem className="flex flex-col items-start">
      <a href={path} className="hover:underline">
        <p className=" text-sm text-">
          <SearchHighlight text={title} highlight={searchParam} />
        </p>
      </a>
      <p className="text-sm text-gray-500">
        <SearchHighlight text={userName} highlight={searchParam} />
      </p>
    </CommandItem>
  );
}
