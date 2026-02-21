"use client";

import { useGetTopHeadlinesQuery } from "../services/api/newsApi";

export default function FeedPage() {
  const { data, isLoading, isError, error } =
    useGetTopHeadlinesQuery("technology");

  if (isLoading) return <div className="p-6">Loading...</div>;

  if (isError){
    console.log(error);
    return <div className="p-6 text-red-500">Error loading news</div>
  }

  return (
    <div className="p-6 space-y-4">
      {data?.articles.map((article, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg bg-white dark:bg-gray-900"
        >
          <h2 className="text-lg font-bold">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {article.description}
          </p>
        </div>
      ))}
    </div>
  );
}