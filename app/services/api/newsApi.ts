import { baseApi } from "./baseApi";
import type { NewsResponse } from "@/app/types/news";


interface NewsQueryParams {
  searchTerm: string;
  page: number;
}



export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, NewsQueryParams>({
      query: ({ searchTerm, page }) => ({
        url: `https://newsapi.org/v2/everything`,
        params: {
          q: searchTerm || "technology",
          sortBy: "publishedAt",
          pageSize: 9,
          page,
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
