"use client";

import { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";

import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";

import { normalizeNews } from "@/app/utils/normalizeContent";
import { normalizeMovies } from "@/app/utils/normalizeMovies";
import { normalizeSocial } from "@/app/utils/normalizeSocial";

import type { ContentItem } from "@/app/types/content";

import SortableGrid from "@/components/content/SortableGrid";
import Pagination from "../ui/Pagination";
import { useFilteredContent } from "@/app/hooks/useFilteredContent";
import Loader from "../ui/Loader";

export default function TrendingSection() {
	const [page, setPage] = useState(1);
	const ITEMS_PER_PAGE = 9;

	const searchQuery = useAppSelector((state) => state.ui.searchQuery);

	//? APi Calls

	const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery({
		searchTerm: "trending",
	});

	const { data: movieData, isLoading: movieLoading } =
		useGetTrendingMoviesQuery();

	const { data: socialData, isLoading: socialLoading } =
		useGetSocialPostsQuery();

	// Normalize safely even during loading
	const newsContent: ContentItem[] = newsData
		? normalizeNews(newsData.articles)
		: [];

	const movieContent: ContentItem[] = movieData
		? normalizeMovies(movieData.results)
		: [];

	const socialContent: ContentItem[] = socialData
		? normalizeSocial(socialData.posts)
		: [];

	const trendingContent: ContentItem[] = [
		...newsContent,
		...movieContent,
		...socialContent,
	];

	const filteredTrending = useFilteredContent(trendingContent);

	if (newsLoading || movieLoading || socialLoading) {
		return <Loader variant="skeleton" count={9} />
	}

	if (filteredTrending.length === 0 && searchQuery) {
		return (
			<div className="p-6 flex flex-col items-center justify-center text-center space-y-3">
				<div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
					🔥
				</div>

				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
					No trending results found
				</h2>

				<p className="text-sm text-gray-500 dark:text-gray-400">
					Nothing trending matches{" "}
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
		Math.ceil(filteredTrending.length / ITEMS_PER_PAGE),
	);

	const safePage = Math.min(page, totalPages);

	const paginatedItems = filteredTrending.slice(
		(safePage - 1) * ITEMS_PER_PAGE,
		safePage * ITEMS_PER_PAGE,
	);

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Trending Across Platform</h1>

			<SortableGrid items={paginatedItems} />

			{filteredTrending.length > 0 && (
				<Pagination
					page={safePage}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
