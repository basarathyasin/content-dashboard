"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/app/store/hooks";
import type { ContentItem } from "@/app/types/content";

interface ScoredItem extends ContentItem {
  score: number;
  reasons: string[];
}

export function useSmartRecommendations(content: ContentItem[]): ScoredItem[] {
  const favorites = useAppSelector((state) => state.favorites.items);
  const preferences = useAppSelector((state) => state.preferences);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);

  return useMemo(() => {
    if (!content.length) return [];

    return content
      .map((item) => {
        let score = 0;
        const reasons: string[] = [];

        // 🔥 Search match
        if (
          searchQuery &&
          (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          score += 3;
          reasons.push(`Because you searched "${searchQuery}"`);
        }

        // 🔥 Favorite similarity
        if (
          favorites.some((fav) =>
            item.title.toLowerCase().includes(fav.title.toLowerCase())
          )
        ) {
          score += 2;
          reasons.push("Based on your favorites");
        }

        // 🔥 Preference match
        if (
          (preferences.showMovies && item.type === "movie") ||
          (preferences.showNews && item.type === "news") ||
          (preferences.showSocial && item.type === "social")
        ) {
          score += 1;
          reasons.push("Matches your preferences");
        }

        return { ...item, score, reasons };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [content, favorites, preferences, searchQuery]);
}