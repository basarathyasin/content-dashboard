"use client";

import { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import type { ContentItem } from "@/app/types/content";
import SortableCard from "./SortableCard";

interface Props {
  items: ContentItem[];
}

export default function SortableGrid({ items }: Props) {
  const [manualOrder, setManualOrder] = useState<string[]>([]);

  const validIds = new Set(items.map((item) => item.id));

  const filteredManualOrder = manualOrder.filter((id) =>
    validIds.has(id)
  );

  const orderedItems =
    filteredManualOrder.length > 0
      ? filteredManualOrder
          .map((id) =>
            items.find((item) => item.id === id)
          )
          .filter(Boolean) as ContentItem[]
      : items;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = orderedItems.findIndex(
      (item) => item.id === active.id
    );
    const newIndex = orderedItems.findIndex(
      (item) => item.id === over.id
    );

    const reordered = arrayMove(
      orderedItems,
      oldIndex,
      newIndex
    );

    setManualOrder(reordered.map((item) => item.id));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedItems.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orderedItems.map((item) => (
            <SortableCard key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}