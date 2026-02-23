import { baseApi } from "./baseApi";
import type { NewsResponse } from "@/app/types/news";

interface NewsQueryParams {
	searchTerm: string;
}

export const newsApi = baseApi.injectEndpoints({
    overrideExisting: true,
	endpoints: (builder) => ({
		getTopHeadlines: builder.query<NewsResponse, NewsQueryParams>({
			query: ({ searchTerm }) => ({
				url: `https://newsapi.org/v2/everything`,
				params: {
					q: searchTerm || "technology",
					sortBy: "publishedAt",
					pageSize: 30,
					apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
				},
			}),
		}),
		getTrendingNews: builder.query<NewsResponse, void>({
			query: () => ({
				url: `https://newsapi.org/v2/top-headlines`,
				params: {
					country: "ind",
					pageSize: 30,
					apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
				},
			}),
		}),
	}),
});

export const { useGetTopHeadlinesQuery,useGetTrendingNewsQuery, } = newsApi;
