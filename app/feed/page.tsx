"use client";

import { useState } from "react";

import { useAppSelector } from "@/app/store/hooks";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { normalizeNews } from "../utils/normalizeContent";
import { useDebounce } from "@/app/hooks/useDebounce";

import { normalizeMovies } from "../utils/normalizeMovies";
import { ContentItem } from "../types/content";


import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";
import { normalizeSocial } from "@/app/utils/normalizeSocial";
import SortableGrid from "@/components/content/SortableGrid";

export default function FeedPage() {
	const searchQuery = useAppSelector((state) => state.ui.searchQuery);
	const debouncedQuery = useDebounce(searchQuery, 500);

	const [page, setPage] = useState(1);

	const { data, isLoading, isError } = useGetTopHeadlinesQuery({
		searchTerm: debouncedQuery,
		page,
	});

	const { data: movieData, isLoading: moviesLoading } =
		useGetTrendingMoviesQuery();

	const { data: socialData, isLoading: socialLoading } =
		useGetSocialPostsQuery();

	const preferences = useAppSelector((state) => state.preferences);

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




	

	if (isLoading || moviesLoading || socialLoading)
		return <div className="p-6">Loading...</div>;

	if (isError)
		return <div className="p-6 text-red-500">Error loading news</div>;

	return (
		<div className="p-6 space-y-6">
			<SortableGrid items={normalizedContent}/>

			<div className="flex justify-center gap-4">
				<button
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
					className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50"
				>
					Previous
				</button>

				<span className="px-4 py-2">Page {page}</span>

				<button
					onClick={() => setPage((prev) => prev + 1)}
					disabled={!data?.articles.length}
					className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
}
