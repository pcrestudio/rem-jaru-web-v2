export interface ChartData {
  name: string;
  type?: string;
  data?: number[];
  value?: number;
}

export enum BarChartType {
  horizontal = "HORIZONTAL",
  vertical = "VERTICAL",
}

export enum PieChartType {
  row = "row",
  column = "column",
}
