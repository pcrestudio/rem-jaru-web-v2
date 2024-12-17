export interface CustomDataGridPagination<T extends object> {
  pageSize: number;
  page: number;
  results: T[];
}
