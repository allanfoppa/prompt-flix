export interface LlmStrategy {
  extractMovieFilters(query: string): Promise<Record<string, string>>;
}

export const LLM_STRATEGY = 'LLM_STRATEGY';
