import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { LLM_STRATEGY } from './ai.strategy';
import { GroqStrategy } from './strategies/groq.strategy';

@Module({
  providers: [
    AiService,
    {
      provide: LLM_STRATEGY,
      useClass: GroqStrategy,
    },
  ],
  exports: [AiService],
})
export class AiModule {}
