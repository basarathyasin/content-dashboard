"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ContentCard from "./ContentCard";
import type { ContentItem } from "@/app/types/content";

interface Props {
  item: ContentItem;
}

export default function SortableCard({ item }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm"
      >
        ☰
      </div>

      <ContentCard item={item} />
    </div>
  );
}