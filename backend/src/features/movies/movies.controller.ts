import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './search-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movies: MoviesService) {}

  @Post('search')
  @HttpCode(HttpStatus.OK)
  search(@Body() dto: SearchMoviesDto) {
    return this.movies.search(dto.query);
  }
}
