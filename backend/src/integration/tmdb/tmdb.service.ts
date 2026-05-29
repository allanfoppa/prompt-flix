import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TmdbDiscoverResponse } from '../../features/movies/movies.types';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.getOrThrow<string>('TMDB_BASE_URL');
    this.apiKey = this.config.getOrThrow<string>('TMDB_API_KEY');
  }

  async getDiscoverMovies(
    cleanFilters: Record<string, string>,
  ): Promise<TmdbDiscoverResponse> {
    const params = new URLSearchParams({
      api_key: this.apiKey,
      language: 'en-US',
      ...cleanFilters,
    });

    const response = await fetch(`${this.baseUrl}/discover/movie?${params}`);

    if (!response.ok) {
      this.logger.error(`TMDB responded with ${response.status}`);
      throw new BadGatewayException(`TMDB error: ${response.status}`);
    }

    return (await response.json()) as TmdbDiscoverResponse;
  }
}
