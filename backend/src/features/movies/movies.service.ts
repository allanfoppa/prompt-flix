import { Injectable, Logger } from '@nestjs/common';

import { AiService } from '../../integration/ai/ai.service';
import { MovieResponse } from './movies.types';
import { toMovieResponse } from './movies.mapper';
import { MediaService } from '../../integration/media/media.service';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly ai: AiService,
    private readonly media: MediaService,
  ) {}

  async search(query: string): Promise<MovieResponse[]> {
    const filters = await this.ai.extractMovieFilters(query);
    this.logger.log('Extracted filters from AI:', filters);

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v !== '' && v !== null && v !== undefined,
      ),
    );

    const response = await this.media.getDiscoverMovies(cleanFilters);

    this.logger.log(`Received movies from media service`);

    return response.results.map(toMovieResponse);
  }
}
