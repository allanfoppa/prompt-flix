interface ToolProperty {
  type: string;
  description: string;
}

interface SearchMovieProperties {
  [key: string]: ToolProperty;
}

export const searchMovieProperties: SearchMovieProperties = {
  with_genres: {
    type: 'string',
    description:
      'Genre IDs separated by comma (AND) or pipe (OR). Action=28, Adventure=12, Animation=16, Comedy=35, Crime=80, Documentary=99, Drama=18, Family=10751, Fantasy=14, History=36, Horror=27, Music=10402, Mystery=9648, Romance=10749, Science Fiction=878, TV Movie=10770, Thriller=53, War=10752, Western=37',
  },
  'vote_average.gte': {
    type: 'string',
    description:
      'Minimum rating from 0 to 10. "highly rated" → 8.0, "good movies" → 7.0, "decent" → 6.0',
  },
  'vote_average.lte': {
    type: 'string',
    description: 'Maximum rating from 0 to 10.',
  },
  'vote_count.gte': {
    type: 'string',
    description:
      'Minimum number of votes. Use to filter obscure results. "popular" → 1000, "well known" → 500',
  },
  primary_release_year: {
    type: 'string',
    description:
      'Exact release year (e.g. 1994). Use when user mentions a specific year.',
  },
  'primary_release_date.gte': {
    type: 'string',
    description:
      'Release date from (YYYY-MM-DD). "90s" → 1990-01-01, "2000s" → 2000-01-01, "recent" → 2020-01-01',
  },
  'primary_release_date.lte': {
    type: 'string',
    description:
      'Release date until (YYYY-MM-DD). "90s" → 1999-12-31, "2000s" → 2009-12-31, "classic" → 2000-12-31',
  },
  with_original_language: {
    type: 'string',
    description:
      'Original language ISO code. English=en, Portuguese=pt, Japanese=ja, French=fr, Spanish=es, Korean=ko, Italian=it',
  },
  sort_by: {
    type: 'string',
    description:
      'Sort results. "popular" or default → popularity.desc, "best rated" → vote_average.desc, "newest" → primary_release_date.desc, "oldest" → primary_release_date.asc',
  },
  with_cast: {
    type: 'string',
    description:
      'Filter by one or more actor and actress name or TMDB person ID.',
  },
  with_keywords: {
    type: 'string',
    description:
      'Thematic keywords to refine search. Examples: "space", "zombie", "heist", "revenge", "time travel"',
  },
  with_runtime: {
    type: 'string',
    description:
      '"short film" or "short" → use with_runtime.lte=60, "long" → with_runtime.gte=120',
  },
  'with_runtime.gte': {
    type: 'string',
    description: 'Minimum runtime in minutes.',
  },
  'with_runtime.lte': {
    type: 'string',
    description: 'Maximum runtime in minutes.',
  },
  include_adult: {
    type: 'string',
    description: 'Include adult content. Default: false',
  },
};
