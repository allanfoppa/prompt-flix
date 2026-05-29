import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
}

export interface TmdbDiscoverResponse {
  results: TmdbMovie[];
  total_results: number;
  total_pages: number;
  page: number;
}

@Injectable()
export class TmdbStrategy {
  private readonly logger = new Logger(TmdbStrategy.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.getOrThrow<string>('TMDB_BASE_URL');
    this.apiKey = this.config.getOrThrow<string>('TMDB_API_KEY');
  }

  async getDiscoverMovies(
    filters: Record<string, string>,
  ): Promise<TmdbDiscoverResponse> {
    const params = new URLSearchParams({
      api_key: this.apiKey,
      language: 'en-US',
      ...filters,
    });

    const response = await fetch(`${this.baseUrl}/discover/movie?${params}`);

    if (!response.ok) {
      this.logger.error(`TMDB responded with ${response.status}`);
      throw new BadGatewayException(`TMDB error: ${response.status}`);
    }

    return (await response.json()) as TmdbDiscoverResponse;
  }
}
