import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './search-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movies: MoviesService) {}

  @Version('2')
  @Post('discover')
  @HttpCode(HttpStatus.OK)
  search(@Body() dto: SearchMoviesDto) {
    return this.movies.search(dto.query);
  }
}
