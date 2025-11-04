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
/** Mô tả thông tin IMDB */
export interface ImdbInfo {
  id: string | null; // mã IMDB (nếu có)
}

/** Mô tả thời gian chỉnh sửa gần nhất */
export interface ModifiedInfo {
  time: string; // ISO date string
}

/** Mô tả danh mục (category) hoặc quốc gia */
export interface NamedEntity {
  id: string;
  name: string;
  slug: string;
}

/** Định nghĩa cấu trúc chính của một bộ phim */
export interface MovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string; // ví dụ: "hoathinh"
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  time: string; // ví dụ: "25 phút/tập"
  episode_current: string; // ví dụ: "Tập 36"
  quality: string; // "FHD", "HD", ...
  lang: string; // "Vietsub", "Thuyết minh", ...
  year: number; // năm phát hành
  tmdb: TmdbInfo;
  imdb: ImdbInfo;
  modified: ModifiedInfo;
  category: NamedEntity[];
  country: NamedEntity[];
}

export interface TmdbInfo {
  type: 'movie' | 'tv';
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
export interface Episode {
  index: number;
  title: string;
}
export interface StreamServer {
  label: string;
  kind: 'SUB' | 'RAW';
  sources: { name: string; url: string }[];
}
export interface AnimeItem {
  id: string;
  title: string;
  thumb: string;
  views: number;
  rank: number;
}
