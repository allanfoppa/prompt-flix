import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { LlmStrategy } from './llm.strategy';
import { searchMovieProperties } from '../tools/search-movies.tool';

@Injectable()
export class GroqStrategy implements LlmStrategy {
  private client: Groq;

  constructor(private config: ConfigService) {
    this.client = new Groq({
      apiKey: this.config.get<string>('GROQ_API_KEY', ''),
    });
  }

  async extractMovieFilters(query: string): Promise<Record<string, string>> {
    const response = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: query }],
      tools: [
        {
          type: 'function',
          function: {
            name: 'search_movies',
            description:
              'Extract filters to search movies on TMDB based on user query',
            parameters: {
              type: 'object',
              properties: searchMovieProperties,
              required: [],
            },
          },
        },
      ],
      tool_choice: 'required',
    });

    const call = response.choices[0]?.message.tool_calls?.[0];
    if (!call?.function.arguments) return {};

    return JSON.parse(call.function.arguments) as Record<string, string>;
  }
}
