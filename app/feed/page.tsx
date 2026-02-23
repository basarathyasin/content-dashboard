"use client";

import { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";

import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";

import { normalizeNews } from "@/app/utils/normalizeContent";
import { normalizeMovies } from "@/app/utils/normalizeMovies";
import { normalizeSocial } from "@/app/utils/normalizeSocial";

import type { ContentItem } from "@/app/types/content";

import SortableGrid from "@/components/content/SortableGrid";
import Pagination from "@/components/ui/Pagination";
import { useFilteredContent } from "@/app/hooks/useFilteredContent";
import Loader from "@/components/ui/Loader";

export default function FeedPage() {
	const [page, setPage] = useState(1);
	const ITEMS_PER_PAGE = 9;

	const preferences = useAppSelector((state) => state.preferences);
	const searchQuery = useAppSelector((state) => state.ui.searchQuery);

	const noPreferencesSelected =
		!preferences.showNews && !preferences.showMovies && !preferences.showSocial;

	const {
		data: newsData,
		isLoading: newsLoading,
		isError,
	} = useGetTopHeadlinesQuery({
		searchTerm: "",
	});

	const { data: movieData, isLoading: movieLoading } =
		useGetTrendingMoviesQuery();

	const { data: socialData, isLoading: socialLoading } =
		useGetSocialPostsQuery();

	// Normalize content
	const newsContent: ContentItem[] = newsData
		? normalizeNews(newsData.articles)
		: [];

	const movieContent: ContentItem[] = movieData
		? normalizeMovies(movieData.results)
		: [];

	const socialContent: ContentItem[] = socialData
		? normalizeSocial(socialData.posts)
		: [];

	const combinedContent: ContentItem[] = [
		...(preferences.showNews ? newsContent : []),
		...(preferences.showMovies ? movieContent : []),
		...(preferences.showSocial ? socialContent : []),
	];

	// 🔥 Apply reusable search hook
	const filteredContent = useFilteredContent(combinedContent);

	// Loading & error states AFTER hooks
	if (newsLoading || movieLoading || socialLoading) {
		return <Loader variant="skeleton" count={9} />
	}

	if (isError) {
		return <div className="p-6 text-red-500">Error loading content</div>;
	}

	if (noPreferencesSelected) {
		return (
			<div className="p-6 flex flex-col items-center justify-center text-center space-y-3">
				<div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
					⚙️
				</div>
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
					Nothing to show
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
					Turn on at least one content category in the sidebar.
				</p>
			</div>
		);
	}

	// Empty search state
	if (filteredContent.length === 0 && searchQuery) {
		return (
			<div className="p-6 flex flex-col items-center justify-center text-center space-y-3">
				<div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
					🔍
				</div>
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
					No results found
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Nothing matches{" "}
					<span className="font-medium text-gray-800 dark:text-gray-200">
						{searchQuery}
					</span>
					.
				</p>
			</div>
		);
	}

	// Pagination AFTER filtering
	const totalPages = Math.max(
		1,
		Math.ceil(filteredContent.length / ITEMS_PER_PAGE),
	);

	const safePage = Math.min(page, totalPages);

	const paginatedItems = filteredContent.slice(
		(safePage - 1) * ITEMS_PER_PAGE,
		safePage * ITEMS_PER_PAGE,
	);

	return (
		<div className="p-6 space-y-6">
			<SortableGrid items={paginatedItems} />

			{filteredContent.length > 0 && (
				<Pagination
					page={safePage}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
