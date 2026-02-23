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
				className="px-4 py-2 rounded-lg shadow-sm  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
			>
				Previous
			</button>

			<span className="px-4 py-2 rounded-lg shadow-sm  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
				Page {page} of {totalPages}
			</span>

			<button
				onClick={() => onPageChange(Math.min(page + 1, totalPages))}
				disabled={page === totalPages}
				className="px-4 py-2 rounded-lg shadow-sm  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
			>
				Next
			</button>
		</div>
	);
}
