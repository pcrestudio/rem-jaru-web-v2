import React, { FC, useCallback } from "react";
import useSWR from "swr";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import HorizontalBarChart from "@/app/admin/components/bar/HorizontalBarChart/HorizontalBarChart";
import { ReportTabType } from "@/app/admin/types/ReportTabType";
import {
  GetReportByTodoDto,
  GetReportStatesDto,
} from "@/app/dto/report/get-report-by-todo.dto";
import { ChartData } from "@/app/admin/types/ChartDataType";
import reportByTodoHorizontalBarColumns from "@/app/admin/components/ReportTabs/columns/reportByTodoColumns";
import TodoSemaphore from "@/app/admin/todos/components/todo-semaphore/TodoSemaphore";
import useStore from "@/lib/store";

const ReportByTodo: FC<ReportTabType> = ({ slug }) => {
  const { filter } = useStore();

  const { data } = useSWR<GetReportByTodoDto>(
    `${environment.baseUrl}/report/${slug}${filter.queryReport}`,
    fetcher,
  );

  const todoStateYAxisData = data?.states.map((option) => option.label) ?? [];

  const todoStateChartData =
    (data?.states.map((option) => ({
      name: option.label,
      type: "bar",
      data: [option.count],
    })) as ChartData[]) ?? [];

  const total = data?.states.reduce((sum, item) => sum + (item.count || 0), 0);

  const renderBarChartCell = useCallback(
    (report: GetReportStatesDto, columnKey: string | number) => {
      const cellValue = report[columnKey];
      const percent = (report.count / total) * 100;

      switch (columnKey) {
        case "label":
          return (
            <div className="flex flex-row gap-4 items-center justify-between">
              <p className="text-cerulean-950 font-semibold ">{report.label}</p>
              <div>
                <TodoSemaphore slug={report.slug} />
              </div>
            </div>
          );

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [total],
  );

  return (
    <HorizontalBarChart<GetReportStatesDto>
      cells={renderBarChartCell}
      chartData={todoStateChartData}
      columns={reportByTodoHorizontalBarColumns}
      dataGridKey="label"
      items={data?.states}
      title="N° de ToDo's"
      yAxisData={todoStateYAxisData}
    />
  );
};

export default ReportByTodo;
