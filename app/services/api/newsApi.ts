import { baseApi } from "./baseApi";
import type { NewsResponse } from "@/app/types/news";


export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, string>({
      query: (category: string) => ({
        url: `https://newsapi.org/v2/top-headlines`,
        params: {
          country: "us",
          category,
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
          
        },
      }),
    }),
  }),
});



export const { useGetTopHeadlinesQuery } = newsApi;