export default function generatePage(page: number, totalPages: number) {
  const INIT_PAGE_ARRAY = Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1);
  const LAST_PAGE_ARRAY = Array.from({ length: Math.min(3, totalPages) }, (_, i) => totalPages - 2 + i);
  const MIDDLE_PAGE_ARRAY = [page - 1, page, page + 1].filter((p) => p > 0 && p <= totalPages);

  if (page <= 2) return INIT_PAGE_ARRAY;
  if (page >= totalPages - 2) return LAST_PAGE_ARRAY;
  return MIDDLE_PAGE_ARRAY;
}
