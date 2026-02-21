"use client";

import type { ContentItem } from "@/app/types/content";
import Image from "next/image";

interface Props {
  item: ContentItem;
}

export default function ContentCard({ item }: Props) {
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 transition-colors">
      {item.image && (
        <Image
          src={item.image}
          alt={item.title}
          width={1080}
          height={720}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}

      <h2 className="text-lg font-bold mb-2">
        {item.title}
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {item.description}
      </p>

      <a
        href={item.link}
        target="_blank"
        className="text-blue-600 dark:text-blue-400 text-sm font-medium"
      >
        Read More →
      </a>
    </div>
  );
}