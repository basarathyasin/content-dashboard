import { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { useDebounce } from "./useDebounce";
import { ContentItem } from "@/app/types/content";

export function useFilteredContent(content: ContentItem[]) {
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const filteredContent = useMemo(() => {
    if (!debouncedQuery) return content;

    const query = debouncedQuery.toLowerCase();

    return content.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";
      const description = item.description?.toLowerCase() ?? "";

      return title.includes(query) || description.includes(query);
    });
  }, [content, debouncedQuery]);

  return filteredContent;
}