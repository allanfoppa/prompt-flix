import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI, Schema, Type } from '@google/genai';
import { LlmStrategy } from '../ai.strategy';
import { searchMovieProperties } from '../tools/search-movies.tool';

@Injectable()
export class GeminiStrategy implements LlmStrategy {
  private client: GoogleGenAI;

  constructor(private config: ConfigService) {
    this.client = new GoogleGenAI({
      apiKey: this.config.getOrThrow<string>('GEMINI_API_KEY'),
    });
  }

  async extractMovieFilters(query: string): Promise<Record<string, string>> {
    const response = await this.client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: query,
      config: {
        tools: [
          {
            functionDeclarations: [
              {
                name: 'search_movies',
                description:
                  'Extract filters to search movies on TMDB based on user query',
                parameters: {
                  type: Type.OBJECT,
                  properties: searchMovieProperties as Record<string, Schema>,
                  required: [],
                },
              },
            ],
          },
        ],
      },
    });

    const call = response.functionCalls?.[0];
    if (!call?.args) return {};

    return call.args as Record<string, string>;
  }
}
