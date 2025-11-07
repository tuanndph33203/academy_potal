export enum SortField {
  Modified = 'modified.time',
  Id = '_id',
  Year = 'year',
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortLang {
  Vietsub = 'vietsub',
  ThuyetMinh = 'thuyet-minh',
  LongTieng = 'long-tieng',
}
export interface PhimApiParams {
  type_list?: TypeFilm;
  page?: number;
  sort_field?: SortField;
  sort_type?: SortType;
  sort_lang?: SortLang;
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
}
export enum FilterKey {
  Countries = 'country',
  Types = 'type',
  Ratings = 'rating',
  Genres = 'genre',
  Versions = 'version',
  Years = 'year',
  SortBy = 'sort',
}
export const FilterKeyLabel: Record<string, string> = {
  [FilterKey.Countries]: 'Quốc gia',
  [FilterKey.Types]: 'Loại phim',
  [FilterKey.Ratings]: 'Xếp hạng',
  [FilterKey.Genres]: 'Thể loại',
  [FilterKey.Versions]: 'Phiên bản',
  [FilterKey.Years]: 'Năm sản xuất',
  [FilterKey.SortBy]: 'Sắp xếp',
};

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
export const COUNTRIES_FILTER: string[] = [
  'Tất cả',
  'Anh',
  'Canada',
  'Hàn Quốc',
  'Hồng Kông',
  'Mỹ',
  'Nhật Bản',
  'Pháp',
  'Thái Lan',
  'Trung Quốc',
  'Úc',
  'Đài Loan',
  'Đức',
];
export const RATINGS_FILTER: string[] = [
  'Tất cả',
  'P (Mọi lứa tuổi)',
  'K (Dưới 13 tuổi)',
  'T13 (13 tuổi trở lên)',
  'T16 (16 tuổi trở lên)',
  'T18 (18 tuổi trở lên)',
];
export const GENRES_FILTER: string[] = [
  'Tất cả',
  'Anime',
  'Bí Ẩn',
  'Chiến Tranh',
  'Chiếu Rạp',
  'Chuyển Thể',
  'Chính Kịch',
  'Chính Luận',
  'Chính Trị',
  'Chương Trình Truyền Hình',
  'Concert Film',
  'Cung Đấu',
  'Cuối Tuần',
  'Cách Mạng',
  'Cổ Trang',
  'Cổ Tích',
  'Cổ Điển',
  'DC',
  'Disney',
  'Gay Cấn',
  'Gia Đình',
  'Giáng Sinh',
  'Giả Tưởng',
  'Hoàng Cung',
  'Hoạt Hình',
  'Hài',
  'Hành Động',
  'Hình Sự',
  'Học Đường',
  'Khoa Học',
  'Kinh Dị',
  'Kinh Điển',
  'Kịch Nói',
  'Kỳ Ảo',
  'LGBT+',
  'Live Action',
  'Lãng Mạn',
  'Lịch Sử',
  'Marvel',
  'Miền Viễn Tây',
  'Nghề Nghiệp',
  'Người Mẫu',
  'Nhạc Kịch',
  'Phiêu Lưu',
  'Phép Thuật',
  'Siêu Anh Hùng',
  'Thiếu Nhi',
  'Thần Thoại',
  'Thể Thao',
  'Truyền Hình Thực Tế',
  'Tuổi Trẻ',
  'Tài Liệu',
  'Tâm Lý',
  'Tình Cảm',
  'Tập Luyện',
  'Viễn Tưởng',
  'Võ Thuật',
  'Xuyên Không',
  'Đau Thương',
  'Đời Thường',
  'Ẩm Thực',
];
export const YEARS_FILTER: string[] = [
  'Tất cả',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
];
export const SORTBY_FILTER: string[] = ['Mới nhất', 'Mới cập nhật', 'Điểm IMDb', 'Lượt xem'];
export const TYPES_FILTER: string[] = ['Tất cả', 'Phim lẻ', 'Phim bộ'];
export const VERSIONS_FILTER: string[] = [
  'Tất cả',
  'Phụ đề',
  'Lồng tiếng',
  'Thuyết minh giọng Bắc',
  'Thuyết minh giọng Nam',
];

export const FilterConfig: Record<FilterKey, string[]> = {
  [FilterKey.Countries]: COUNTRIES_FILTER,
  [FilterKey.Types]: TYPES_FILTER,
  [FilterKey.Ratings]: RATINGS_FILTER,
  [FilterKey.Genres]: GENRES_FILTER,
  [FilterKey.Versions]: VERSIONS_FILTER,
  [FilterKey.Years]: YEARS_FILTER,
  [FilterKey.SortBy]: SORTBY_FILTER,
};
