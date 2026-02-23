export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  type: "news" | "movie" | "social";

  // 🔥 Optional recommendation metadata
  score?: number;
  reasons?: string[];
}