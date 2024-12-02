export const mockPagination = {
  Pagination: ({ className, children }: any) => <nav className={className}>{children}</nav>,
  PaginationContent: ({ children }: any) => <ul>{children}</ul>,
  PaginationItem: ({ children }: any) => <li>{children}</li>,
  PaginationLink: ({ className, onClick, children }: any) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  ),
  PaginationPrevious: ({ onClick, className }: any) => (
    <button onClick={onClick} className={className}>
      Previous
    </button>
  ),
  PaginationNext: ({ onClick, className }: any) => (
    <button onClick={onClick} className={className}>
      Next
    </button>
  ),
  PaginationEllipsis: () => <span>...</span>,
};
