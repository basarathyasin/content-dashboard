"use client";

import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";

import { normalizeNews } from "@/app/utils/normalizeContent";
import { normalizeMovies } from "@/app/utils/normalizeMovies";
import { normalizeSocial } from "@/app/utils/normalizeSocial";

import type { ContentItem } from "@/app/types/content";
import SortableGrid from "@/components/content/SortableGrid";
import { useState } from "react";
import Pagination from "../ui/Pagination";

export default function TrendingSection() {
	const [page, setPage] = useState(1);
	const ITEMS_PER_PAGE = 9;

	const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery({
		searchTerm: "trending",
	});

	const { data: movieData, isLoading: movieLoading } =
		useGetTrendingMoviesQuery();

	const { data: socialData, isLoading: socialLoading } =
		useGetSocialPostsQuery();

	if (newsLoading || movieLoading || socialLoading)
		return <div className="p-6">Loading trending content...</div>;

	const newsContent: ContentItem[] = newsData
		? normalizeNews(newsData.articles)
		: [];

	const movieContent: ContentItem[] = movieData
		? normalizeMovies(movieData.results)
		: [];

	const socialContent: ContentItem[] = socialData
		? normalizeSocial(socialData.posts)
		: [];

	const trendingContent = [...newsContent, ...movieContent, ...socialContent];
	const totalPages = Math.ceil(trendingContent.length / ITEMS_PER_PAGE);

	const paginatedItems = trendingContent.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	);

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Trending Across Platform</h1>

			<SortableGrid items={paginatedItems} />
			{trendingContent.length > 0 && (
				<Pagination
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}
