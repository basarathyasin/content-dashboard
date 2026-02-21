"use client";

import { useAppSelector } from "@/app/store/hooks";
import ContentCard from "@/components/content/ContentCard";

export default function FavoritesPage() {
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        No favorites yet.
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}