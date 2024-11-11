import { useSearchStore } from "@/store/useSearchStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function SearchPages({ totalPages }: { totalPages: number }) {
  const { page, setPage } = useSearchStore();

  const INIT_PAGE_ARRAY = Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1);
  const LAST_PAGE_ARRAY = Array.from({ length: Math.min(3, totalPages) }, (_, i) => totalPages - 2 + i);
  const MIDDLE_PAGE_ARRAY = [page - 1, page, page + 1].filter((p) => p > 0 && p <= totalPages);

  const pageNumber: number[] =
    page <= 2 ? INIT_PAGE_ARRAY : page >= totalPages - 2 ? LAST_PAGE_ARRAY : MIDDLE_PAGE_ARRAY;

  const handlePage = ({ mode }: { mode: number | "prev" | "next" }) => {
    if (mode === "prev" && page > 1) {
      setPage(page - 1);
    } else if (mode === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (typeof mode === "number") {
      setPage(mode);
    }
  };

  return (
    <Pagination className="flex gap-4">
      <PaginationPrevious
        onClick={() => handlePage({ mode: "prev" })}
        className="border-none min-w-[100px]"
      ></PaginationPrevious>

      <PaginationContent>
        {page > 2 && <PaginationEllipsis />}
        {pageNumber.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink onClick={() => handlePage({ mode: number })} className={page === number ? "border" : ""}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages - 2 && <PaginationEllipsis />}
      </PaginationContent>

      <PaginationNext
        onClick={() => handlePage({ mode: "next" })}
        className="border-none min-w-[100px]"
      ></PaginationNext>
    </Pagination>
  );
}
