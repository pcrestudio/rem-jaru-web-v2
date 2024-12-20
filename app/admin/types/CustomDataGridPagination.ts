export interface CustomDataGridPagination<T extends object> {
  pageSize: number;
  page: number;
  totalPages: number;
  results: T[];
}
