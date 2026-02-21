"use client";

import { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { normalizeNews } from "../utils/normalizeContent";
import { useDebounce } from "@/app/hooks/useDebounce";
import ContentCard from "@/components/content/ContentCard";

export default function FeedPage() {
  const searchQuery = useAppSelector(
    (state) => state.ui.searchQuery
  );

  const debouncedQuery = useDebounce(searchQuery, 500);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } =
    useGetTopHeadlinesQuery({
      searchTerm: debouncedQuery,
      page,
    });

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
    <div key={debouncedQuery} className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {normalizedContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {page}
        </span>

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