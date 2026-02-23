"use client";

import { useState } from "react";
import { useGetTrendingMoviesQuery } from "@/app/services/api/movieApi";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { useGetSocialPostsQuery } from "@/app/services/api/socialApi";

import { normalizeNews } from "@/app/utils/normalizeContent";
import { normalizeMovies } from "@/app/utils/normalizeMovies";
import { normalizeSocial } from "@/app/utils/normalizeSocial";

import { useSmartRecommendations } from "@/app/hooks/useSmartRecommendations";
import SortableGrid from "@/components/content/SortableGrid";
import Pagination from "@/components/ui/Pagination";
import Loader from "@/components/ui/Loader";

export default function RecommendationsSection() {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const { data: newsData, isLoading: newsLoading } =
    useGetTopHeadlinesQuery({ searchTerm: "popular" });

  const { data: movieData, isLoading: movieLoading } =
    useGetTrendingMoviesQuery();

  const { data: socialData, isLoading: socialLoading } =
    useGetSocialPostsQuery();

  const news = newsData ? normalizeNews(newsData.articles) : [];
  const movies = movieData ? normalizeMovies(movieData.results) : [];
  const social = socialData ? normalizeSocial(socialData.posts) : [];

  const combined = [...news, ...movies, ...social];

  const recommended = useSmartRecommendations(combined);

  if (newsLoading || movieLoading || socialLoading) {
    return <Loader variant="skeleton" count={9} />;
  }

  if (!recommended.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        Start interacting with content to unlock smarter recommendations.
      </div>
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(recommended.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(page, totalPages);

  const paginated = recommended.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Recommended For You</h1>

      <SortableGrid items={paginated} />

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}