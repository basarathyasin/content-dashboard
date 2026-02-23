export interface ContentItem {
  id: string;
  type: "news" | "movie" | "social";
  title: string;
  description: string;
  image?: string;
  link: string;
}