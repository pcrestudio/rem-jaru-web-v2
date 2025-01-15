import React, { FC, useCallback } from "react";
import useSWR from "swr";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { ReportTabType } from "@/app/admin/types/ReportTabType";
import useStore from "@/lib/store";
import PieChart from "@/app/admin/components/pie/PieChart/PieChart";
import { GetReportByResponsibleDto } from "@/app/dto/report/get-report-by-responsible.dto";
import { ChartData, PieChartType } from "@/app/admin/types/ChartDataType";
import reportByResponsibleColumns from "@/app/admin/components/ReportTabs/columns/reportByResponsibleColumns";
import ReportEmptyState from "@/app/admin/components/ReportEmptyState/ReportEmptyState";

const ReportByResponsible: FC<ReportTabType> = ({ slug }) => {
  const { filter } = useStore();

  const { data } = useSWR<GetReportByResponsibleDto[]>(
    `${environment.baseUrl}/report/${slug}${filter.queryReport}`,
    fetcher,
  );

  const responsibleChartData =
    (data?.map((option) => ({
      name: option.name,
      value: option.count,
    })) as ChartData[]) ?? [];

  const renderPieChartCell = useCallback(
    (matter: GetReportByResponsibleDto, columnKey: string | number) => {
      const cellValue = matter[columnKey];

      switch (columnKey) {
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <PieChart<GetReportByResponsibleDto>
      cells={renderPieChartCell}
      chartData={responsibleChartData}
      columns={reportByResponsibleColumns}
      items={data}
      title="N° DE EXPEDIENTES POR RESPONSABLE"
      type={PieChartType.column}
    />
  );
};

export default ReportByResponsible;
