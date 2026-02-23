"use client";

import { useAppSelector } from "@/app/store/hooks";
import SortableGrid from "@/components/content/SortableGrid";
import { useState } from "react";
import Pagination from "@/components/ui/Pagination";

export default function FavoritesPage() {
	const [page, setPage] = useState(1);
	const ITEMS_PER_PAGE = 9;
	const favorites = useAppSelector((state) => state.favorites.items);
	const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);

	const paginatedItems = favorites.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	);

	if (!favorites.length) {
		return <div className="p-6 text-gray-500">No favorites yet.</div>;
	}

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Your Favorites</h1>

			<SortableGrid items={paginatedItems} />
			{favorites.length > 0 && (
				<Pagination
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
