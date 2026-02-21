"use client";

import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";

import { normalizeNews } from "@/app/utils/normalizeContent";
import { normalizeMovies } from "@/app/utils/normalizeMovies";
import { normalizeSocial } from "@/app/utils/normalizeSocial";


import type { ContentItem } from "@/app/types/content";
import SortableGrid from "@/components/content/SortableGrid";

export default function TrendingPage() {
  const { data: newsData, isLoading: newsLoading } =
    useGetTopHeadlinesQuery({
      searchTerm: "trending",
      page: 1,
    });

  const { data: movieData, isLoading: movieLoading } =
    useGetTrendingMoviesQuery();

  const { data: socialData, isLoading: socialLoading } =
    useGetSocialPostsQuery();

  if (newsLoading || movieLoading || socialLoading)
    return <div className="p-6">Loading trending content...</div>;

  const newsContent: ContentItem[] =
    newsData ? normalizeNews(newsData.articles) : [];

  const movieContent: ContentItem[] =
    movieData ? normalizeMovies(movieData.results) : [];

  const socialContent: ContentItem[] =
    socialData ? normalizeSocial(socialData.posts) : [];

  const trendingContent = [
    ...newsContent,
    ...movieContent,
    ...socialContent,
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Trending Across Platform
      </h1>

      <SortableGrid items={trendingContent} />
    </div>
  );
}