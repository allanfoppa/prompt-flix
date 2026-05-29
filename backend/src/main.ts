import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Enable URI versioning for the API.
   *
   * For study purposes, I put three versions of the API in this project. The first version is the default one, which is used for the root endpoint. The V2 is used for the movies search endpoint, and the V1 version is used for the health check endpoint.
   *
   * With URI versioning, the API version is specified in the URL path.
   * For example:
   * To access the movies search endpoint, you would use the URL `/v2/movies/search`.
   * To access the health check endpoint, you would use the URL `/v1/health`
   * While metadata is accessed at the root endpoint.
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
