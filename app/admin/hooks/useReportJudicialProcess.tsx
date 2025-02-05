import useSWR from "swr";
import { ReactNode, useCallback } from "react";

import {
  GetContingenciesReportDto,
  GetInitReportDto,
  GetInstancesReportDto,
  GetMasterOptionReportDto,
} from "@/app/dto/report/get-init-report.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GlobalFilter } from "@/lib/types/filter.type";
import { ChartData } from "@/app/admin/types/ChartDataType";

interface UseReportJudicialProcessProps {
  data: GetInitReportDto;
  studioYAxisData: string[];
  instanceYAxisData: string[];
  studioChartData: ChartData[];
  matterChartData: ChartData[];
  instanceChartData: ChartData[];
  renderBarChartCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderInstanceBarChartCell: (
    item: GetInstancesReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderPieChartCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderContingenciesCell: (
    item: GetContingenciesReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderCriticalProcessesCell: (
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

  const regex = /\?([^=&]+)=([^&]*)/;
  const match = filter?.queryReport?.match(regex);
  const moduleId = match[2];

  const studioYAxisData =
    data?.studio.report[0]?.masterOption?.map((option) => option.name) ?? [];

  const studioChartData =
    (data?.studio.report[0]?.masterOption?.map((option) => ({
      name: option.name,
      type: "bar",
      data: [option._count.judicialStudios],
    })) as ChartData[]) ?? [];

  const matterChartData =
    (data?.matters.report[0]?.Submodule.map((option) => ({
      name: option.name,
      value:
        moduleId === "2"
          ? option._count.Supervision
          : option._count.JudicialProcess,
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

  const mattersTotal = data?.matters.report[0].Submodule.reduce(
    (sum, item) =>
      sum +
      (moduleId === "2"
        ? item?._count.Supervision
        : item?._count.JudicialProcess || 0),
    0,
  );

  const renderPieChartCell = useCallback(
    (matter: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = matter[columnKey];
      const percent =
        (moduleId === "2"
          ? matter._count.Supervision
          : matter._count.JudicialProcess / mattersTotal) * 100;

      switch (columnKey) {
        case "count":
          return (
            <p>
              {moduleId === "2"
                ? matter._count.Supervision
                : matter._count.JudicialProcess}
            </p>
          );

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [mattersTotal],
  );

  const totalContingencies = data?.contingencies.report.reduce(
    (sum, item) => sum + (item.count || 0),
    0,
  );

  const renderContingenciesCell = useCallback(
    (contingency: GetContingenciesReportDto, columnKey: string | number) => {
      const cellValue = contingency[columnKey];
      const percent = (contingency.count / totalContingencies) * 100;

      switch (columnKey) {
        case "count":
          return <p>{contingency.count}</p>;

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [totalContingencies],
  );

  const totalCriticalProcesses = data?.criticalProcesses.report.reduce(
    (sum, item) => sum + (item._count?.group || 0),
    0,
  );

  const renderCriticalProcessesCell = useCallback(
    (contingency: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = contingency[columnKey];
      const percent = (contingency._count.group / totalCriticalProcesses) * 100;

      switch (columnKey) {
        case "count":
          return <p>{contingency._count.group}</p>;

        case "percent":
          return <p>{percent.toFixed(2)} %</p>;

        default:
          return cellValue;
      }
    },
    [totalCriticalProcesses],
  );

  const instanceYAxisData =
    data?.instances?.report.map((option) => option.instanceName) ?? [];

  const instanceChartData =
    (data?.instances.report.map((option) => ({
      name: option.instanceName,
      type: "bar",
      data: [option.count],
    })) as ChartData[]) ?? [];

  const totalInstances = data?.instances.report.reduce(
    (sum, item) => sum + (item.count || 0),
    0,
  );

  const renderInstanceBarChartCell = useCallback(
    (report: GetInstancesReportDto, columnKey: string | number) => {
      const cellValue = report[columnKey];

      const percent = (report.count / totalInstances) * 100;

      switch (columnKey) {
        case "count":
          return <p>{report.count}</p>;

        case "percent":
          return (
            <p>
              {!isNaN(percent) ? percent.toFixed(2) : Number(0).toFixed(2)} %
            </p>
          );

        default:
          return cellValue;
      }
    },
    [totalInstances],
  );

  return {
    data,
    studioChartData,
    studioYAxisData,
    matterChartData,
    renderBarChartCell,
    renderPieChartCell,
    renderInstanceBarChartCell,
    renderContingenciesCell,
    renderCriticalProcessesCell,
    totalJudicialProcess: total,
    instanceChartData,
    instanceYAxisData,
  };
};

export default useReportJudicialProcess;
