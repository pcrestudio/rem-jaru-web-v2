import useSWR from "swr";
import { ReactNode, useCallback } from "react";

import {
  GetInitReportDto,
  GetMasterOptionReportDto,
} from "@/app/dto/report/get-init-report.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GlobalFilter } from "@/lib/types/filter.type";
import { ChartData } from "@/app/admin/types/ChartDataType";

interface UseReportJudicialProcessProps {
  data: GetInitReportDto;
  studioYAxisData: string[];
  studioChartData: ChartData[];
  matterChartData: ChartData[];
  renderBarChartCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderPieChartCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderContingenciesCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  totalJudicialProcess: number;
}

const useReportJudicialProcess = (
  filter: GlobalFilter,
): UseReportJudicialProcessProps => {
  const { data } = useSWR<GetInitReportDto>(
    `${environment.baseUrl}/report/init${filter.queryReport ?? ""}`,
    fetcher,
  );

  const studioYAxisData =
    data?.studio.report[0].masterOption.map((option) => option.name) ?? [];

  const studioChartData =
    (data?.studio.report[0].masterOption.map((option) => ({
      name: option.name,
      type: "bar",
      data: [option._count.judicialStudios],
    })) as ChartData[]) ?? [];

  const matterChartData =
    (data?.matters.report[0].Submodule.map((option) => ({
      name: option.name,
      value: option._count.JudicialProcess,
    })) as ChartData[]) ?? [];

  const total = data?.studio.report[0]?.masterOption?.reduce(
    (sum, item) => sum + (item._count?.judicialStudios || 0),
    0,
  );

  const renderBarChartCell = useCallback(
    (report: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = report[columnKey];
      const percent = (report._count.judicialStudios / total) * 100;

      switch (columnKey) {
        case "count":
          return <p>{report._count.judicialStudios}</p>;

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [total],
  );

  const renderPieChartCell = useCallback(
    (matter: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = matter[columnKey];
      const percent = (matter._count.JudicialProcess / total) * 100;

      switch (columnKey) {
        case "count":
          return <p>{matter._count.JudicialProcess}</p>;

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [total],
  );

  const renderContingenciesCell = useCallback(
    (contingency: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = contingency[columnKey];
      const percent = (contingency._count.group / total) * 100;

      switch (columnKey) {
        case "count":
          return <p>{contingency._count.group}</p>;

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [total],
  );

  return {
    data,
    studioChartData,
    studioYAxisData,
    matterChartData,
    renderBarChartCell,
    renderPieChartCell,
    renderContingenciesCell,
    totalJudicialProcess: total,
  };
};

export default useReportJudicialProcess;
