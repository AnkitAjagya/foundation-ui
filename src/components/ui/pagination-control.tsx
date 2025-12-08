import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  showPageNumbers = true,
  maxVisiblePages = 5,
  size = "default",
  className,
}: PaginationControlProps) => {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("ellipsis");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    default: "h-9 w-9 text-sm",
    lg: "h-10 w-10 text-base",
  };

  const buttonSize = size === "sm" ? "icon-sm" : "icon";

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      {/* First page */}
      {showFirstLast && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={sizeClasses[size]}
        >
          <span className="sr-only">First page</span>
          <ChevronLeft className="h-4 w-4" />
          <ChevronLeft className="h-4 w-4 -ml-2" />
        </Button>
      )}

      {/* Previous page */}
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={sizeClasses[size]}
      >
        <span className="sr-only">Previous page</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {showPageNumbers &&
        getPageNumbers().map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                "flex items-center justify-center text-muted-foreground",
                sizeClasses[size]
              )}
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size={buttonSize}
              onClick={() => onPageChange(page)}
              className={cn(
                sizeClasses[size],
                currentPage === page && "pointer-events-none"
              )}
            >
              {page}
            </Button>
          )
        )}

      {/* Next page */}
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={sizeClasses[size]}
      >
        <span className="sr-only">Next page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page */}
      {showFirstLast && (
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={sizeClasses[size]}
        >
          <span className="sr-only">Last page</span>
          <ChevronRight className="h-4 w-4" />
          <ChevronRight className="h-4 w-4 -ml-2" />
        </Button>
      )}
    </nav>
  );
};

// Simple pagination info
interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  className?: string;
}

export const PaginationInfo = ({
  currentPage,
  pageSize,
  totalItems,
  className,
}: PaginationInfoProps) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Showing <span className="font-medium">{start}</span> to{" "}
      <span className="font-medium">{end}</span> of{" "}
      <span className="font-medium">{totalItems}</span> results
    </p>
  );
};

export default PaginationControl;
