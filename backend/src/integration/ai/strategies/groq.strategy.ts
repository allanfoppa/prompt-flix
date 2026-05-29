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
      apiKey: this.config.getOrThrow<string>('GROQ_API_KEY'),
    });
  }

  async extractMovieFilters(query: string): Promise<Record<string, string>> {
    console.log('Using Groq strategy to extract movie filters', query);
    console.log('searchMovieProperties', searchMovieProperties);
    const response = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
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
      messages: [
        {
          role: 'system',
          content:
            'You are a movie search assistant. Extract TMDB filters from the user query. If the user specifies how many movies they want (e.g. "just one", "only one", "give me 3"), extract that as the limit field.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    const call = response.choices[0]?.message.tool_calls?.[0];
    if (!call?.function.arguments) return {};

    return JSON.parse(call.function.arguments) as Record<string, string>;
  }
}
