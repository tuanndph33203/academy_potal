export interface IResponse<T> {
  status: boolean;
  msg: string;
  items: T;
  pagination: Pagination;
}
export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}
