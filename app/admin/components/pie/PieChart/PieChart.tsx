import React, { ReactNode } from "react";
import ReactECharts from "echarts-for-react";
import ReportChartDataGrid from "@/app/admin/components/ReportChartDataGrid/ReportChartDataGrid";
import { ChartData } from "@/app/admin/types/ChartDataType";

interface PieChartChartProps<T extends object> {
  title: string;
  chartData: ChartData[];
  items: T[];
  columns: any;
  cells: (item: T, columnKey: string | number) => ReactNode;
}

const PieChart = <T extends object>({
  title,
  chartData,
  items,
  cells,
  columns,
}: PieChartChartProps<T>) => {
  const colors = ["#5470C6", "#91CC75", "#EE6666", "#FAC858"];

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

  return (
    <div className="flex flex-row gap-4">
      <ReportChartDataGrid<T>
        items={(items as T[]) ?? []}
        columns={columns}
        cells={cells}
        dataGridKey="name"
      />
      <ReactECharts
        option={option}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default PieChart;
