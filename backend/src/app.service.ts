import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as pack from '../package.json';

@Injectable()
export class AppService {
  metadata(): object {
    try {
      const appMetadata = {
        title: 'PromptFlix API',
        summary: 'API to recommend movies and series based on user prompts.',
        version: `${pack.version}`,
        author: {
          name: 'Allan Foppa Fagundes',
          email: 'allanfoppa.dev@gmail.com',
          githubProfile: 'https://github.com/allanfoppa',
        },
      };

      return appMetadata;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
