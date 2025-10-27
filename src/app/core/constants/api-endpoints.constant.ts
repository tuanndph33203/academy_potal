import { TypeFilm } from './film.constant';

export const API_ENDPOINTS = {
  NEW_UPDATES_V3: 'danh-sach/phim-moi-cap-nhat-v3',
  COLLECTION: `danh-sach/${TypeFilm.PhimBo}`,
  MOVIES: '',
  MOVIE_DETAIL: (slug: string) => `/api/movies/${slug}`,
  TRENDING: '',
  COUNTRY: 'quoc-gia',
};
