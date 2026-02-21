"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { toggleFavorite } from "@/app/slices/favoritesSlice";
import { ContentItem } from "@/app/types/content";

export default function FavoritesHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      const items: ContentItem[] = JSON.parse(stored);

      items.forEach((item) => {
        dispatch(toggleFavorite(item));
      });
    }
  }, [dispatch]);

  return null;
}