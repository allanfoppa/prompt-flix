import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { AiModule } from '../ai/ai.module';
import { MOVIE_STRATEGY } from '../../integration/movie.strategy';
import { TmdbService } from '../../integration/tmdb/tmdb.service';

@Module({
  imports: [AiModule],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    {
      provide: MOVIE_STRATEGY,
      useClass: TmdbService,
    },
  ],
})
export class MoviesModule {}
