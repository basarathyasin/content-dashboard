import type { NewsArticle } from "../types/news";
import type { ContentItem } from "../types/content";

export function normalizeNews(
  articles: NewsArticle[]
): ContentItem[] {
  return articles.map((article) => ({
    id: article.url, // unique enough
    type: "news",
    title: article.title,
    description: article.description ?? "",
    image: article.urlToImage ?? "",
    link: article.url,
  }));
}