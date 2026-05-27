import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from '../../ai/ai.service';
import { MovieResponse, TmdbDiscoverResponse } from './movies.types';
import { toMovieResponse } from './movies.mapper';

@Injectable()
export class MoviesService {
  private baseUrl: string;
  private apiKey: string;

  constructor(
    private config: ConfigService,
    private ai: AiService,
  ) {
    this.baseUrl = this.config.get<string>(
      'TMDB_BASE_URL',
      'https://api.themoviedb.org/3',
    );
    this.apiKey = this.config.get<string>(
      'TMDB_API_KEY',
      'https://api.themoviedb.org/3',
    );
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
      throw new Error(`TMDB error: ${response.status}`);
    }

    const data = (await response.json()) as TmdbDiscoverResponse;
    return data.results.map(toMovieResponse);
  }
}
