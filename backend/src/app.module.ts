import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { MoviesModule } from './features/movies/movies.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MoviesModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
