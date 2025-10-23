export interface Movie {
  _id: string;
  name: string;
  slug: string;
  description: string;
  poster: string;
  year: number;
  genres: string[];
  country: string;
  views: number;
  episodes?: Episode[];
}

export interface Episode {
  name: string;
  url: string;
  sub?: string;
}
export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  tmdb: TmdbInfo;
  imdb: ImdbInfo;
  modified: ModifiedInfo;
}

export interface TmdbInfo {
  type: 'movie' | 'tv'; // hoặc string nếu bạn có thêm loại khác
  id: string;
  season?: number;
  vote_average: number;
  vote_count: number;
}

export interface ImdbInfo {
  id: string | null;
}

export interface ModifiedInfo {
  time: string; // ISO string
}
