import { TmdbDiscoverResponse } from '../features/movies/movies.types';

export interface MovieStrategy {
  getDiscoverMovies(
    cleanFilters: Record<string, string>,
  ): Promise<TmdbDiscoverResponse>;
}

export const MOVIE_STRATEGY = 'MOVIE_STRATEGY';
