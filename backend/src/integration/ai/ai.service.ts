import { Inject, Injectable } from '@nestjs/common';
import { LLM_STRATEGY } from './ai.strategy';
import type { LlmStrategy } from './ai.strategy';

@Injectable()
export class AiService {
  constructor(@Inject(LLM_STRATEGY) private readonly llm: LlmStrategy) {}

  async extractMovieFilters(query: string): Promise<Record<string, string>> {
    return this.llm.extractMovieFilters(query);
  }
}
