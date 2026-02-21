"use client";

import { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { useAppSelector } from "@/app/store/hooks";
import { useGetTopHeadlinesQuery } from "@/app/services/api/newsApi";
import { normalizeNews } from "../utils/normalizeContent";
import { useDebounce } from "@/app/hooks/useDebounce";
import SortableCard from "@/components/content/SortableCard";

import { ContentItem } from "../types/content";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

export default function FeedPage() {
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } =
    useGetTopHeadlinesQuery({
      searchTerm: debouncedQuery,
      page,
    });

  const normalizedContent: ContentItem[] =
    data ? normalizeNews(data.articles) : [];

  const [manualOrder, setManualOrder] = useState<string[]>([]);

const items: ContentItem[] =
  manualOrder.length > 0
    ? manualOrder
        .map((id) =>
          normalizedContent.find((item) => item.id === id)
        )
        .filter(Boolean) as ContentItem[]
    : normalizedContent;

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    const oldIndex = items.findIndex(
      (item) => item.id === active.id
    );
    const newIndex = items.findIndex(
      (item) => item.id === over.id
    );

    const reordered = arrayMove(items, oldIndex, newIndex);
    setManualOrder(reordered.map((item) => item.id));
  }
};
  if (isLoading)
    return <div className="p-6">Loading...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-500">
        Error loading news
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <SortableCard key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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