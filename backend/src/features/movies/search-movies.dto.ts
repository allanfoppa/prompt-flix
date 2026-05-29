import { IsString, MinLength, MaxLength } from 'class-validator';

export class SearchMoviesDto {
  @MaxLength(300, { message: 'Query must be at most 300 characters long' })
  @MinLength(2, { message: 'Query must be at least 2 characters long' })
  @IsString({ message: 'Query must be a string' })
  query!: string;
}
