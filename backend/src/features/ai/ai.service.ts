import { Inject, Injectable } from '@nestjs/common';
import { LLM_STRATEGY } from './strategies/llm.strategy';
import type { LlmStrategy } from './strategies/llm.strategy';

@Injectable()
export class AiService {
  constructor(@Inject(LLM_STRATEGY) private readonly llm: LlmStrategy) {}

  async extractMovieFilters(query: string): Promise<Record<string, string>> {
    return this.llm.extractMovieFilters(query);
  }
}
