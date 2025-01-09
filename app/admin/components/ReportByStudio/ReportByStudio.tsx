import React, { useCallback } from "react";
import useSWR from "swr";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import HorizontalBarChart from "@/app/admin/components/bar/HorizontalBarChart/HorizontalBarChart";
import { BarChartType, ChartData } from "@/app/admin/types/ChartDataType";
import useStore from "@/lib/store";
import reportByStudioColumns from "@/app/admin/components/ReportTabs/columns/reportByStudioColumns";
import { GetReportByStudioDto } from "@/app/dto/report/get-report-by-studio.dto";

const ReportByStudio = () => {
  const { filter } = useStore();

  const { data } = useSWR<GetReportByStudioDto[]>(
    `${environment.baseUrl}/report/byStudio${filter.queryReport}`,
    fetcher,
  );

  const studioLabelAxisData = data?.map((option) => option.name) ?? [];

  const studioChartData =
    (data?.map((option) => ({
      name: option.name,
      type: "bar",
      data: [option.count],
    })) as ChartData[]) ?? [];

  const total = data?.reduce((sum, item) => sum + (item.count || 0), 0);

  const renderBarChartCell = useCallback(
    (report: GetReportByStudioDto, columnKey: string | number) => {
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
      chartData={studioChartData}
      columns={reportByStudioColumns}
      dataGridKey="name"
      items={data ?? []}
      title={"N° DE EXPEDIENTES POR ESTUDIO"}
      type={BarChartType.horizontal}
      yAxisData={studioLabelAxisData}
    />
  );
};

export default ReportByStudio;
