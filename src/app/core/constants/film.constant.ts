export enum TypeFilm {
  PhimBo = 'phim-bo',
  PhimLe = 'phim-le',
  TvShows = 'tv-shows',
  HoatHinh = 'hoat-hinh',
  PhimVietsub = 'phim-vietsub',
  PhimThuyetMinh = 'phim-thuyet-minh',
  PhimLongTieng = 'phim-long-tieng',
}

export const TypeFilmLabel: Record<TypeFilm, string> = {
  [TypeFilm.PhimBo]: 'Phim Bộ',
  [TypeFilm.PhimLe]: 'Phim Lẻ',
  [TypeFilm.TvShows]: 'TV Shows',
  [TypeFilm.HoatHinh]: 'Hoạt Hình',
  [TypeFilm.PhimVietsub]: 'Phim Vietsub',
  [TypeFilm.PhimThuyetMinh]: 'Phim Thuyết Minh',
  [TypeFilm.PhimLongTieng]: 'Phim Lồng Tiếng',
};

export const typePilmOptions = Object.entries(TypeFilm).map(([_, value]) => ({
  label: TypeFilmLabel[value as TypeFilm],
  value,
}));

export enum TypeEpisode {
  PhimDaiTap = 'series',
  PhimLe = 'single',
}

export const TypeEpisodeLabel: Record<TypeEpisode, string> = {
  [TypeEpisode.PhimDaiTap]: 'Phim Dài Tập',
  [TypeEpisode.PhimLe]: 'Phim Lẻ',
};

export enum TypeServer {
  Vietsub = 'sub',
  LongTieng = 'dub',
}

export const TypeServerLabel: Record<TypeServer, string> = {
  [TypeServer.Vietsub]: 'Vietsub',
  [TypeServer.LongTieng]: 'Lồng Tiếng',
};
export const configTypeServer = [
  {
    type: TypeServer.Vietsub,
    label: TypeServerLabel[TypeServer.Vietsub],
  },
  {
    type: TypeServer.LongTieng,
    label: TypeServerLabel[TypeServer.LongTieng],
  },
];
