import React, { ReactNode } from "react";
import ReactECharts from "echarts-for-react";

import ReportChartDataGrid from "@/app/admin/components/ReportChartDataGrid/ReportChartDataGrid";
import { ChartData, PieChartType } from "@/app/admin/types/ChartDataType";
import ReportEmptyState from "@/app/admin/components/ReportEmptyState/ReportEmptyState";

interface PieChartChartProps<T extends object> {
  title: string;
  chartData: ChartData[];
  items: T[];
  columns: any;
  cells: (item: T, columnKey: string | number) => ReactNode;
  type?: string;
}

const PieChart = <T extends object>({
  title,
  chartData,
  items,
  cells,
  columns,
  type = PieChartType.row,
}: PieChartChartProps<T>) => {
  const option = {
    title: {
      text: title.toUpperCase(),
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Procesos Judiciales",
        type: "pie",
        radius: "50%",
        data: [...chartData],
      },
    ],
  };

  return items && items.length === 0 ? (
    <ReportEmptyState />
  ) : (
    <div
      className={`${type === PieChartType.row ? "flex flex-row gap-4" : "flex flex-col gap-4"}`}
    >
      <ReportChartDataGrid<T>
        cells={cells}
        columns={columns}
        dataGridKey="name"
        items={(items as T[]) ?? []}
      />
      <div className={`${type === PieChartType.row ? "" : "-order-1"}`}>
        <ReactECharts
          option={option}
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
