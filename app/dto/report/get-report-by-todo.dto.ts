export interface GetReportByTodoDto {
  states: GetReportStatesDto[];
}

export interface GetReportStatesDto {
  label: string;
  slug: string;
  count: number;
  alertTrue: number;
  alertFalse: number;
  checkTrue: number;
  checkFalse: number;
}
