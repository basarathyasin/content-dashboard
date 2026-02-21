import type { Movie } from "../types/movies";
import type { ContentItem } from "../types/content";

export function normalizeMovies(movies: Movie[]): ContentItem[] {
  return movies.map((movie) => ({
    id: `movie-${movie.id}`,
    type: "movie",
    title: movie.title,
    description: movie.overview,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
    link: "#",
  }));
}