import SearchInput from "@/components/search/SearchHeader/SearchInput";
import FilterButton from "@/components/search/SearchFilters/FilterButton";
import SearchResultList from "@/components/search/SearchResults/SearchResultList";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
        <SearchInput />
        <FilterButton />
        <SearchResultList />
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
