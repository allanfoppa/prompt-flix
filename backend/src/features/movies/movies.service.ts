import { Injectable, Logger, Inject } from '@nestjs/common';

import { AiService } from '../ai/ai.service';
import { MovieResponse } from './movies.types';
import { toMovieResponse } from './movies.mapper';
import { MOVIE_STRATEGY } from '../../integration/movie.strategy';
import type { MovieStrategy } from '../../integration/movie.strategy';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly ai: AiService,
    @Inject(MOVIE_STRATEGY) private readonly movieStrategy: MovieStrategy,
  ) {}

  async search(query: string): Promise<MovieResponse[]> {
    const filters = await this.ai.extractMovieFilters(query);
    console.log('Extracted filters from AI:', filters);

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v !== '' && v !== null && v !== undefined,
      ),
    );

    const response = await this.movieStrategy.getDiscoverMovies(cleanFilters);

    this.logger.log(`Received ${response.results.length} movies from strategy`);

    return response.results.map(toMovieResponse);
  }
}
