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
      formatter: function (params: any) {
        const total = chartData.reduce((sum, item) => sum + item.value, 0); // Calculate the total sum of all values
        const percent = ((params.value / total) * 100).toFixed(2); // Calculate percentage

        return `${params.name}: ${percent}%`; // Display percentage in the tooltip
      },
    },
    series: [
      {
        name: "Procesos Judiciales",
        type: "pie",
        radius: "50%",
        data: [...chartData],
        label: {
          show: true, // Show labels
          formatter: "{b}: {c}", // Keep raw numbers for labels (e.g., "A: 10")
        },
      },
    ],
  };

  return items && items.length === 0 ? (
    <ReportEmptyState />
  ) : (
    <div
      className={`${type === PieChartType.row ? "grid grid-cols-12 gap-4" : "flex flex-col gap-4"}`}
    >
      <div className="col-span-6">
        <ReportChartDataGrid<T>
          cells={cells}
          columns={columns}
          dataGridKey="name"
          items={(items as T[]) ?? []}
        />
      </div>
      <div
        className={`${type === PieChartType.row ? "col-span-6" : "col-span-12 -order-1"}`}
      >
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
