export const API_ENDPOINTS = {
  NEW_UPDATES_V3: '/danh-sach/phim-moi-cap-nhat-v3',
  MOVIES: '',
  MOVIE_DETAIL: (slug: string) => `/api/movies/${slug}`,
  TRENDING: '',
  COMMENTS: (id: string) => `/api/movies/${id}/comments`,
};
