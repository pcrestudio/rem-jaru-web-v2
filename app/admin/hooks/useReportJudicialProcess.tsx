import useSWR from "swr";
import { ReactNode, useCallback, useState } from "react";

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
import { GetExchangeDto } from "@/app/dto/report/get-exchange.dto";
import { mappingModuleEN } from "@/config/mapping_submodules";

interface UseReportJudicialProcessProps {
  data: GetInitReportDto;
  studioYAxisData: string[];
  instanceYAxisData: string[];
  internalSpecialistYAxisData: string[];
  studioChartData: ChartData[];
  matterChartData: ChartData[];
  criticalProcessesChartData: ChartData[];
  instanceChartData: ChartData[];
  internalSpecialistData: ChartData[];
  causesChartData: ChartData[];
  handleExchange: () => void;
  exchange: GetExchangeDto;
  calculateTotal: (shouldBeDollar: boolean, amount: number) => string | number;
  isDollar: boolean;
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
  renderInternalSpecialistBarChartCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  renderCausesCell: (
    item: GetMasterOptionReportDto,
    columnKey: string | number,
  ) => ReactNode;
  totalJudicialProcess: number;
}

const semaphoreColor = (name: string) => {
  switch (name) {
    case "Virtualmente seguro":
      return "bg-[#c20e4d] font-bold p-2 text-white";

    case "Alto":
      return "bg-[#FF999A] font-bold p-2";

    case "Significativo":
      return "bg-[#c4841d] font-bold p-2";

    case "Medio":
      return "bg-[#FFF9CA] font-bold p-2";

    case "Bajo":
      return "bg-[#DFF0D9] font-bold p-2";

    case "Probable":
      return "bg-[#FF999A] font-bold p-2";

    case "Remoto":
      return "bg-[#DFF0D9] font-bold p-2";

    default:
      return "bg-[#FFF9CA] font-bold p-2";
  }
};

const useReportJudicialProcess = (
  filter: GlobalFilter,
): UseReportJudicialProcessProps => {
  const { data } = useSWR<GetInitReportDto>(
    `${environment.baseUrl}/report/init${filter.queryReport ?? ""}`,
    fetcher,
  );

  const [isDollar, setIsDollar] = useState<boolean>(false);

  const { data: exchange } = useSWR<GetExchangeDto>(
    `${environment.baseUrl}/exchange`,
    fetcher,
  );

  const studioYAxisData =
    data?.studio.report[0]?.masterOption?.map((option) => option.name) ?? [];

  const internalSpecialistYAxisData =
    data?.internalSpecialists.report.map((option) => option.name) ?? [];

  const studioChartData =
    (data?.studio.report[0]?.masterOption?.map((option) => ({
      name: option.name,
      type: "bar",
      data: [option._count.judicialStudios],
    })) as ChartData[]) ?? [];

  const matterChartData =
    (data?.matters.report[0]?.Submodule.map((option) => ({
      name: option.name,
      value: option._count[mappingModuleEN[filter.modelType]],
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
          return (
            <p>{!isNaN(percent) ? Number(percent).toFixed(2) : Number(0)} %</p>
          );

        default:
          return cellValue;
      }
    },
    [total],
  );

  const mattersTotal = data?.matters.report[0].Submodule.reduce(
    (sum, item) => sum + item?._count[mappingModuleEN[filter.modelType]] || 0,
    0,
  );

  const renderPieChartCell = useCallback(
    (matter: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = matter[columnKey];
      const percent =
        (matter._count[mappingModuleEN[filter.modelType]] / mattersTotal) * 100;

      switch (columnKey) {
        case "count":
          return <p>{matter._count[mappingModuleEN[filter.modelType]]}</p>;

        case "percent":
          return (
            <p>{!isNaN(percent) ? Number(percent).toFixed(2) : Number(0)} %</p>
          );

        default:
          return cellValue;
      }
    },
    [mattersTotal],
  );

  const criticalProcessesChartData =
    (data?.criticalProcesses.report.map((option) => ({
      name: option.name,
      value: option._count.group,
    })) as ChartData[]) ?? [];

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
          return (
            <p>{!isNaN(percent) ? Number(percent).toFixed(2) : Number(0)} %</p>
          );

        default:
          return <p className={semaphoreColor(cellValue)}>{cellValue}</p>;
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

      console.log(isNaN(percent));

      switch (columnKey) {
        case "count":
          return <p>{contingency._count.group}</p>;

        case "percent":
          return (
            <p>
              {!isNaN(percent)
                ? Number(percent).toFixed(2)
                : Number(0).toFixed(2)}
              %
            </p>
          );

        default:
          return <p className={semaphoreColor(cellValue)}>{cellValue}</p>;
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
            <p>{!isNaN(percent) ? Number(percent).toFixed(2) : Number(0)} %</p>
          );

        default:
          return cellValue;
      }
    },
    [totalInstances],
  );

  const handleExchange = () => {
    setIsDollar(!isDollar);
  };

  const float = new Intl.NumberFormat(isDollar ? "en-EN" : "es-PE", {
    style: "currency",
    currency: isDollar ? "USD" : "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const calculateTotal = (shouldBeDollar: boolean, amount: number) => {
    if (shouldBeDollar) {
      const conversion = amount / exchange?.value;

      return !isNaN(conversion) ? Number(conversion).toFixed(2) : 0;
    }

    return !isNaN(amount) ? float.format(amount) : Number(0).toFixed(2);
  };

  const internalSpecialistData =
    (data?.internalSpecialists.report.map((option) => ({
      name: option.name,
      type: "bar",
      data: [option._count.group],
    })) as ChartData[]) ?? [];

  const totalInternalSpecialist = data?.internalSpecialists.report.reduce(
    (sum, item) => sum + (item._count.group || 0),
    0,
  );

  const renderInternalSpecialistBarChartCell = useCallback(
    (report: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = report[columnKey];
      const percent = (report._count.group / totalInternalSpecialist) * 100;

      switch (columnKey) {
        case "count":
          return <p>{report._count.group}</p>;

        case "percent":
          return (
            <p>{!isNaN(percent) ? Number(percent).toFixed(2) : Number(0)} %</p>
          );

        default:
          return cellValue;
      }
    },
    [total],
  );

  const causesChartData =
    (data?.causes.report.map((option) => ({
      name: option.name,
      value: option._count.group,
    })) as ChartData[]) ?? [];

  const totalCauses = data?.causes.report.reduce(
    (sum, item) => sum + (item._count?.group || 0),
    0,
  );

  const renderCausesCell = useCallback(
    (causes: GetMasterOptionReportDto, columnKey: string | number) => {
      const cellValue = causes[columnKey];
      const percent = (causes._count.group / totalCauses) * 100;

      switch (columnKey) {
        case "count":
          return <p>{causes._count.group}</p>;

        case "percent":
          return (
            <p>{!isNaN(percent) ? Number(percent).toFixed(2) : Number(0)} %</p>
          );

        default:
          return cellValue;
      }
    },
    [totalCauses],
  );

  return {
    data,
    exchange,
    handleExchange,
    calculateTotal,
    isDollar,
    studioChartData,
    studioYAxisData,
    matterChartData,
    criticalProcessesChartData,
    renderBarChartCell,
    renderPieChartCell,
    renderInstanceBarChartCell,
    renderContingenciesCell,
    renderCriticalProcessesCell,
    totalJudicialProcess: total,
    instanceChartData,
    instanceYAxisData,
    internalSpecialistYAxisData,
    internalSpecialistData,
    renderInternalSpecialistBarChartCell,
    causesChartData,
    renderCausesCell,
  };
};

export default useReportJudicialProcess;
