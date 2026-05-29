import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { AiModule } from '../../integration/ai/ai.module';
import { MediaModule } from '../../integration/media/media.module';

@Module({
  imports: [AiModule, MediaModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
