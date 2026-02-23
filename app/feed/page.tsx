"use client";

import { useAppSelector } from "@/app/store/hooks";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { normalizeNews } from "../utils/normalizeContent";
import { useDebounce } from "@/app/hooks/useDebounce";

import { normalizeMovies } from "../utils/normalizeMovies";
import { ContentItem } from "../types/content";
import Pagination from "@/components/ui/Pagination";
import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";
import { normalizeSocial } from "@/app/utils/normalizeSocial";
import SortableGrid from "@/components/content/SortableGrid";
import { useState } from "react";

export default function FeedPage() {
	const searchQuery = useAppSelector((state) => state.ui.searchQuery);
	const debouncedQuery = useDebounce(searchQuery, 500);

	const [page, setPage] = useState(1);

	const { data, isLoading, isError } = useGetTopHeadlinesQuery({
		searchTerm: debouncedQuery,
	});

	const { data: movieData, isLoading: moviesLoading } =
		useGetTrendingMoviesQuery();

	const { data: socialData, isLoading: socialLoading } =
		useGetSocialPostsQuery();

	const ITEMS_PER_PAGE = 9;

	const preferences = useAppSelector((state) => state.preferences);
	const noPreferencesSelected =
		!preferences.showNews && !preferences.showMovies && !preferences.showSocial;

	const newsContent: ContentItem[] = data ? normalizeNews(data.articles) : [];

	const movieContent: ContentItem[] = movieData
		? normalizeMovies(movieData.results)
		: [];
	const socialContent = socialData ? normalizeSocial(socialData.posts) : [];

	const normalizedContent: ContentItem[] = [
		...(preferences.showNews ? newsContent : []),
		...(preferences.showMovies ? movieContent : []),
		...(preferences.showSocial ? socialContent : []),
	];

	const totalPages = Math.ceil(normalizedContent.length / ITEMS_PER_PAGE);

	const paginatedItems = normalizedContent.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	);

	if (isLoading || moviesLoading || socialLoading)
		return <div className="p-6">Loading...</div>;

	if (isError)
		return <div className="p-6 text-red-500">Error loading news</div>;
	if (noPreferencesSelected) {
		return (
			<div className="p-6 flex flex-col items-center justify-center h-full text-center space-y-3">
				<div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
					⚙️
				</div>
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
					Nothing to show
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
					Turn on at least one content category in the sidebar to populate your
					feed.
				</p>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<SortableGrid items={paginatedItems} />

			{!noPreferencesSelected && normalizedContent.length > 0 && (
				<Pagination
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
