import React, { FC, useCallback } from "react";
import useSWR from "swr";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { ReportTabType } from "@/app/admin/types/ReportTabType";
import useStore from "@/lib/store";
import PieChart from "@/app/admin/components/pie/PieChart/PieChart";
import { GetReportByResponsibleDto } from "@/app/dto/report/get-report-by-responsible.dto";
import { ChartData, PieChartType } from "@/app/admin/types/ChartDataType";
import { GetReportByPersonDto } from "@/app/dto/report/get-report-by-person.dto";
import reportByPersonColumns from "@/app/admin/components/ReportTabs/columns/reportByPersonColumns";
import { MasterReportTabs } from "@/config/master-report-tabs.config";

const ReportByPerson: FC<ReportTabType> = ({ slug }) => {
  const { filter } = useStore();

  const filterQueryReport = filter.queryReport
    ? `${filter.queryReport}&tabSlug=${slug}`
    : `?tabSlug=${slug}&${filter.queryReport.replace("?", "&")}`;

  const { data } = useSWR<GetReportByPersonDto[]>(
    `${environment.baseUrl}/report/byPerson${filterQueryReport}`,
    fetcher,
  );

  const personChartData =
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
      chartData={personChartData}
      columns={reportByPersonColumns(slug)}
      items={data}
      title={`N° DE EXPEDIENTES POR ${slug === MasterReportTabs.byDemanded ? "DEMANDADO" : "DEMANDANTE"}`}
      type={PieChartType.column}
    />
  );
};

export default ReportByPerson;
