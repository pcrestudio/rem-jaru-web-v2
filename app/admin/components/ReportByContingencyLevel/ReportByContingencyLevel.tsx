import React, { FC, useCallback } from "react";
import useSWR from "swr";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { ReportTabType } from "@/app/admin/types/ReportTabType";
import HorizontalBarChart from "@/app/admin/components/bar/HorizontalBarChart/HorizontalBarChart";
import { BarChartType, ChartData } from "@/app/admin/types/ChartDataType";
import { GetGenericReportDto } from "@/app/dto/report/get-generic-report.dto";
import { GetReportStatesDto } from "@/app/dto/report/get-report-by-todo.dto";
import reportByGenericReportColumns from "@/app/admin/components/ReportTabs/columns/reportByGenericReport";
import useStore from "@/lib/store";

const ReportByContingencyLevel: FC<ReportTabType> = ({ slug }) => {
  const { filter } = useStore();

  const filterQueryReport = filter.queryReport
    ? `${filter.queryReport}&tabSlug=${slug}`
    : `?tabSlug=${slug}&${filter.queryReport.replace("?", "&")}`;

  const { data } = useSWR<GetGenericReportDto>(
    `${environment.baseUrl}/report/generic${filterQueryReport}`,
    fetcher,
  );

  const genericLabelAxisData =
    data?.reportData.map((option) => option.label) ?? [];

  const genericChartData =
    (data?.reportData.map((option) => ({
      name: option.label,
      type: "bar",
      data: [option.count],
    })) as ChartData[]) ?? [];

  const total = data?.reportData.reduce(
    (sum, item) => sum + (item.count || 0),
    0,
  );

  const renderBarChartCell = useCallback(
    (report: GetReportStatesDto, columnKey: string | number) => {
      const cellValue = report[columnKey];

      switch (columnKey) {
        default:
          return cellValue;
      }
    },
    [total],
  );

  return (
    <HorizontalBarChart
      cells={renderBarChartCell}
      chartData={genericChartData}
      columns={reportByGenericReportColumns}
      dataGridKey="label"
      items={data?.reportData}
      title={data ? data.title : ""}
      type={BarChartType.horizontal}
      yAxisData={genericLabelAxisData}
    />
  );
};

export default ReportByContingencyLevel;
