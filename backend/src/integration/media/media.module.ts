import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MEDIA_STRATEGY } from './strategies/media.strategy';
import { TmdbStrategy } from './strategies/tmdb.strategy';

@Module({
  providers: [
    MediaService,
    {
      provide: MEDIA_STRATEGY,
      useClass: TmdbStrategy,
    },
  ],
  exports: [MediaService],
})
export class MediaModule {}
