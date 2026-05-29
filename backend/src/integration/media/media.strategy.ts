import { TmdbDiscoverResponse } from './strategies/tmdb.strategy';

export interface MediaStrategy {
  getDiscoverMovies(
    filters: Record<string, string>,
  ): Promise<TmdbDiscoverResponse>;
}

export const MEDIA_STRATEGY = 'MEDIA_STRATEGY';
