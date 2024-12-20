export interface CustomDataGridPagination<T extends object> {
  pageSize: number;
  page: number;
  totalPages: number;
  total: number;
  results: T[];
}
