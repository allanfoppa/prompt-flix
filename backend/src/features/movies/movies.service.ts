import { Injectable, BadGatewayException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from '../ai/ai.service';
import { MovieResponse, TmdbDiscoverResponse } from './movies.types';
import { toMovieResponse } from './movies.mapper';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly config: ConfigService,
    private readonly ai: AiService,
  ) {
    this.baseUrl = this.config.getOrThrow<string>('TMDB_BASE_URL');
    this.apiKey = this.config.getOrThrow<string>('TMDB_API_KEY');
  }

  async search(query: string): Promise<MovieResponse[]> {
    const filters = await this.ai.extractMovieFilters(query);

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

    const data = (await response.json()) as TmdbDiscoverResponse;
    return data.results.map(toMovieResponse);
  }
}
