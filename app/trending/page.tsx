"use client";

import { useGetTrendingNewsQuery } from "../services/api/newsApi";
import { normalizeNews } from "../utils/normalizeContent";
import ContentCard from "@/components/content/ContentCard";

export default function TrendingPage() {
  const { data, isLoading, isError } =
    useGetTrendingNewsQuery();

  if (isLoading)
    return <div className="p-6">Loading trending news...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error loading trending news
      </div>
    );

  const normalizedContent = data
    ? normalizeNews(data.articles)
    : [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Trending News
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {normalizedContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}