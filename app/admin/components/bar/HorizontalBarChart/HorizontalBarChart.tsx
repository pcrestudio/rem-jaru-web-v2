import React, { ReactNode } from "react";
import ReactECharts from "echarts-for-react";

import { ChartData } from "@/app/admin/types/ChartDataType";
import ReportChartDataGrid from "@/app/admin/components/ReportChartDataGrid/ReportChartDataGrid";

interface HorizontalBarChartProps<T extends object> {
  title: string;
  yAxisData: string[];
  chartData: ChartData[];
  items: T[];
  columns: any;
  cells: (item: T, columnKey: string | number) => ReactNode;
}

const HorizontalBarChart = <T extends object>({
  title,
  yAxisData,
  chartData,
  items,
  cells,
  columns,
}: HorizontalBarChartProps<T>) => {
  const combinedData = chartData.map((item) => item.data[0]);

  const colors = ["#5470C6", "#91CC75", "#EE6666", "#FAC858"];

  const option = {
    title: {
      text: title.toUpperCase(),
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: yAxisData,
    },
    series: [
      {
        type: "bar",
        data: combinedData.map((value, index) => ({
          value,
          itemStyle: {
            color: colors[index % colors.length],
          },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <ReactECharts option={option} />
      <ReportChartDataGrid<T>
        cells={cells}
        columns={columns}
        dataGridKey="name"
        items={(items as T[]) ?? []}
      />
    </div>
  );
};

export default HorizontalBarChart;
