export interface GetGenericReportDto {
  reportData: GetGenericReportData[];
  title: string;
}

export interface GetGenericReportData {
  label: string;
  slug: string;
  count: number;
}
