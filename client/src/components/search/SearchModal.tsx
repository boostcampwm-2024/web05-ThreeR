import SearchInput from "@/components/search/SearchHeader/SearchInput";
import FilterButton from "@/components/search/SearchFilters/FilterButton";
import SearchResultList from "@/components/search/SearchResults/SearchResultList";
import { useSearch } from "@/hooks/useSearch";
import { useSearchStore } from "@/store/useSearchStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
export default function SearchModal({ onClose }: { onClose: () => void }) {
  const { resetPage } = useSearchStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchInput />
        <FilterButton />
        <SearchResultList />
        <button className="mt-4 w-full bg-primary text-white py-2 rounded" onClick={onClose}>
          닫기
        </button>
      </motion.div>
    </div>
  );
}
