import React, { ReactNode } from "react";
import ReactECharts from "echarts-for-react";

import { BarChartType, ChartData } from "@/app/admin/types/ChartDataType";
import ReportChartDataGrid from "@/app/admin/components/ReportChartDataGrid/ReportChartDataGrid";
import barChartOptionConfig from "@/app/admin/components/bar/config/bar-chart.config";
import ReportEmptyState from "@/app/admin/components/ReportEmptyState/ReportEmptyState";

interface HorizontalBarChartProps<T extends object> {
  title: string;
  yAxisData: string[];
  chartData: ChartData[];
  items: T[];
  columns: any;
  cells: (item: T, columnKey: string | number) => ReactNode;
  dataGridKey?: string;
  type?: string;
}

const HorizontalBarChart = <T extends object>({
  title,
  yAxisData,
  chartData,
  items,
  cells,
  columns,
  dataGridKey,
  type = BarChartType.vertical,
}: HorizontalBarChartProps<T>) => {
  const combinedData = chartData.map((item) => item.data[0]);
  const colors = ["#5470C6", "#91CC75", "#EE6666", "#FAC858"];
  const option = barChartOptionConfig(
    title,
    combinedData,
    yAxisData,
    colors,
    type,
  );

  return items && items.length === 0 ? (
    <ReportEmptyState />
  ) : (
    <div className="flex flex-col gap-4">
      <ReactECharts option={option} />
      <ReportChartDataGrid<T>
        cells={cells}
        columns={columns}
        dataGridKey={dataGridKey ? dataGridKey : "name"}
        items={(items as T[]) ?? []}
      />
    </div>
  );
};

export default HorizontalBarChart;
