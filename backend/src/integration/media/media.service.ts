import { Inject, Injectable } from '@nestjs/common';
import { MEDIA_STRATEGY } from './media.strategy';
import type { MediaStrategy } from './media.strategy';
import { TmdbDiscoverResponse } from './strategies/tmdb.strategy';

@Injectable()
export class MediaService {
  constructor(
    @Inject(MEDIA_STRATEGY) private readonly mediaStrategy: MediaStrategy,
  ) {}

  async getDiscoverMovies(
    filter: Record<string, string>,
  ): Promise<TmdbDiscoverResponse> {
    return this.mediaStrategy.getDiscoverMovies(filter);
  }
}
