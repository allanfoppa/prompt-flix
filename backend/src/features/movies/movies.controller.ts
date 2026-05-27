import { Body, Controller, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AiService } from '../../ai/ai.service';

export class SearchMoviesDto {
  query!: string;
}

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly ai: AiService,
    private readonly movies: MoviesService,
  ) {}

  @Post('search')
  async search(@Body() dto: SearchMoviesDto) {
    return this.movies.search(dto.query);
  }
}
