import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function Pagination({ page, setPage, totalPages }: PaginationProps) {
  const pageNumbers: number[] = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
    pageNumbers.push(i);
  }

  const paginationButtonClass =
    "flex h-8 items-center justify-center gap-1 rounded-md px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50";
  const pageButtonClass =
    "flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={paginationButtonClass}
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className="size-4" />
        Wstecz
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={cn(
            pageButtonClass,
            pageNumber === page
              ? "bg-primary text-primary-foreground hover:bg-primary/80"
              : "bg-card text-foreground hover:bg-muted"
          )}
          aria-current={pageNumber === page ? "page" : undefined}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        className={paginationButtonClass}
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Dalej
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}