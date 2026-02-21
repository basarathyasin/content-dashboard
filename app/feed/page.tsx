"use client";

import { useGetTopHeadlinesQuery } from "../services/api/newsApi";
import { normalizeNews } from "../utils/normalizeContent";
import ContentCard from "@/components/content/ContentCard";
import { useAppSelector } from "../store/hooks";
import { useDebounce } from "../hooks/useDebounce";

export default function FeedPage() {
  const searchQuery = useAppSelector(
    (state) => state.ui.searchQuery
  );

  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } =
    useGetTopHeadlinesQuery(debouncedQuery);

  if (isLoading)
    return <div className="p-6">Loading...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error loading news
      </div>
    );

  const normalizedContent = data
    ? normalizeNews(data.articles)
    : [];

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {normalizedContent.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
