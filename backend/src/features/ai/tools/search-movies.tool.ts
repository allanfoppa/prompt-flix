const withGenres = {
  type: 'string',
  description:
    'Genre IDs separated by comma. Horror=27, Action=28, Comedy=35, Drama=18, Sci-Fi=878, Romance=10749, Thriller=53, Animation=16, Crime=80, Documentary=99',
};

const primaryReleaseYear = {
  type: 'string',
  description: 'Release year (e.g. 1990)',
};

const primaryReleaseDateGte = {
  type: 'string',
  description: 'Release date greater than or equal (e.g. 1990-01-01)',
};

const primaryReleaseDateLte = {
  type: 'string',
  description: 'Release date less than or equal (e.g. 1999-12-31)',
};

const voteAverageGte = {
  type: 'string',
  description: 'Minimum vote average from 0 to 10 (e.g. 7.0)',
};

const withOriginalLanguage = {
  type: 'string',
  description: 'Original language ISO code (e.g. en, pt, ja, fr)',
};

const sortBy = {
  type: 'string',
  description:
    'Sort results. Options: popularity.desc, vote_average.desc, release_date.desc',
};

interface ToolProperty {
  type: string;
  description: string;
}

interface SearchMovieProperties {
  [key: string]: ToolProperty;
}

export const searchMovieProperties: SearchMovieProperties = {
  with_genres: withGenres,
  primary_release_year: primaryReleaseYear,
  'primary_release_date.gte': primaryReleaseDateGte,
  'primary_release_date.lte': primaryReleaseDateLte,
  'vote_average.gte': voteAverageGte,
  with_original_language: withOriginalLanguage,
  sort_by: sortBy,
};
