import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  metadata(): object {
    try {
      const appMetadata = {
        title: 'PromptFlix API',
        summary: 'API to recommend movies based on user prompts.',
        version: `${process.env.APP_VERSION || '1.0.0'}`,
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
