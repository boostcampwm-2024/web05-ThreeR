import SearchInput from "@/components/search/SearchHeader/SearchInput";
import FilterButton from "@/components/search/SearchFilters/FilterButton";
import SearchResultList from "@/components/search/SearchResults/SearchResultList";
import { Command, CommandSeparator } from "@/components/ui/command";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <Command className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[35.125rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchInput onClose={onClose} />
        <CommandSeparator />
        <FilterButton />
        <CommandSeparator />
        <SearchResultList />
      </div>
    </Command>
  );
}
