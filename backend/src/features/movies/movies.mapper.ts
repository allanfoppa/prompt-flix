import type { MovieResponse } from './movies.types';

export function toMovieResponse(movie: unknown): MovieResponse {
  return {
    id: (movie as { id: number }).id,
    title: (movie as { title: string }).title,
    overview: (movie as { overview: string }).overview,
    releaseYear: (movie as { release_date: string }).release_date.split('-')[0],
    rating:
      Math.round((movie as { vote_average: number }).vote_average * 10) / 10,
    poster: (movie as { poster_path: string }).poster_path
      ? `https://image.tmdb.org/t/p/w500${(movie as { poster_path: string }).poster_path}`
      : null,
  };
}
