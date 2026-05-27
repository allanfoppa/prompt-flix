export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
}

export interface TmdbDiscoverResponse {
  results: TmdbMovie[];
  total_results: number;
  total_pages: number;
  page: number;
}

export interface MovieResponse {
  id: number;
  title: string;
  overview: string;
  releaseYear: string;
  rating: number;
  poster: string | null;
}
