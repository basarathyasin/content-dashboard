"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        Previous
      </button>

      <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
}