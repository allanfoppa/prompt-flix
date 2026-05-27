import type { TmdbMovie, MovieResponse } from './movies.types';

export function toMovieResponse(movie: TmdbMovie): MovieResponse {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseYear: movie.release_date.split('-')[0],
    rating: Math.round(movie.vote_average * 10) / 10,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
  };
}
