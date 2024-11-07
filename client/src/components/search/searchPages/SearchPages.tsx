import { useSearchStore } from "@/store/useSearchStore";
import { ChevronRight, ChevronLeft, ChevronLast, ChevronFirst } from "lucide-react";

export default function SearchPages({ totalPages }: { totalPages: number }) {
  const { page, setPage } = useSearchStore();

  const INIT_PAGE_ARRAY = Array.from({ length: Math.min(7, totalPages) }, (_, i) => i + 1);
  const LAST_PAGE_ARRAY = Array.from({ length: Math.min(7, totalPages) }, (_, i) => totalPages - 6 + i);
  const MIDDLE_PAGE_ARRAY = [page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3].filter(
    (p) => p > 0 && p <= totalPages
  );

  const pageNumber: number[] =
    page <= 4 ? INIT_PAGE_ARRAY : page >= totalPages - 3 ? LAST_PAGE_ARRAY : MIDDLE_PAGE_ARRAY;

  return (
    <div className="flex justify-around gap-1">
      <div className="flex gap-1">
        <button
          className={`py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 `}
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <ChevronFirst />
        </button>
        <button
          className=" py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="flex justify-between">
        {pageNumber.map((number) => (
          <button
            key={number}
            className={`px-2 py-2 text-sm w-10 rounded-md ${
              page === number ? "bg-primary text-white font-bold" : "text-gray-700 hover:bg-gray-100 font-medium"
            }`}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        <button
          className=" py-2 text-sm font-medium rounded-md  text-gray-700 hover:bg-gray-100"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRight />
        </button>
        <button
          className={` py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100`}
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          <ChevronLast />
        </button>
      </div>
    </div>
  );
}
