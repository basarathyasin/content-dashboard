import { baseApi } from "./baseApi";
import type { MovieResponse } from "@/app/types/movies";

export const movieApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<MovieResponse, void>({
      query: () => ({
        url: `https://api.themoviedb.org/3/trending/movie/week`,
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = movieApi;