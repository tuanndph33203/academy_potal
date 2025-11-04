import { TypeFilm } from './film.constant';

export const API_ENDPOINTS = {
  FILM: {
    NEW_UPDATES_V3: 'danh-sach/phim-moi-cap-nhat-v3',
    LIST: 'danh-sach',
    DETAIL: 'phim',
  },

  MOVIES: '',
  MOVIE_DETAIL: (slug: string) => `/api/movies/${slug}`,
  TRENDING: '',
  COUNTRY: 'quoc-gia',
};
