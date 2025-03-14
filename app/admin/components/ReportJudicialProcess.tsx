import React, { FC } from "react";
import { PiHandCoins } from "react-icons/pi";
import { RiAuctionLine } from "react-icons/ri";
import { Switch } from "@heroui/switch";
import { Chip } from "@heroui/chip";

import { GlobalFilter } from "@/lib/types/filter.type";
import useReportJudicialProcess from "@/app/admin/hooks/useReportJudicialProcess";
import ReportCountRecord from "@/app/admin/components/ReportCountRecord/ReportCountRecord";
import ReportChartDataGrid from "@/app/admin/components/ReportChartDataGrid/ReportChartDataGrid";
import judicialProcessCriticalProcessesColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessCriticalProcessesColumns";
import {
  GetContingenciesReportDto,
  GetInstancesReportDto,
  GetMasterOptionReportDto,
} from "@/app/dto/report/get-init-report.dto";
import HorizontalBarChart from "@/app/admin/components/bar/HorizontalBarChart/HorizontalBarChart";
import judicialProcessHorizontalBarColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessHorizontalBarColumns";
import ReportProvisionAmountRecord from "@/app/admin/components/ReportProvisionAmountRecord/ReportProvisionAmountRecord";
import judicialProcessContingenciesColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessContingenciesColumns";
import PieChart from "@/app/admin/components/pie/PieChart/PieChart";
import judicialProcessPieBarColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessPieBarColumns";
import judicialProcessInstanceHorizontalBarColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessInstanceHorizontalBarColumns";
import { convertFormatDistanceToNow } from "@/utils/format_date";
import internalSpecialistColumns from "@/app/admin/components/ReportChartDataGrid/columns/internalSpecialistColumns";
import causesColumns from "@/app/admin/components/ReportChartDataGrid/columns/causesColumns";
import { PieChartType } from "@/app/admin/types/ChartDataType";

interface ReportJudicialProcess {
  filter: GlobalFilter;
}

const ReportJudicialProcess: FC<ReportJudicialProcess> = ({ filter }) => {
  const {
    matterChartData,
    renderPieChartCell,
    exchange,
    renderBarChartCell,
    handleExchange,
    calculateTotal,
    isDollar,
    instanceChartData,
    renderContingenciesCell,
    renderCriticalProcessesCell,
    renderInstanceBarChartCell,
    data,
    studioChartData,
    studioYAxisData,
    instanceYAxisData,
    totalJudicialProcess,
    internalSpecialistYAxisData,
    internalSpecialistData,
    renderInternalSpecialistBarChartCell,
    causesChartData,
    renderCausesCell,
  } = useReportJudicialProcess(filter);

  return (
    <div className="grid grid-cols-12 items-stretch gap-10">
      <div className="col-span-12">
        <div className="flex flex-row gap-4 items-center">
          <Switch
            className="filter"
            isSelected={isDollar}
            onChange={handleExchange}
          >
            <span className="text-sm">
              {isDollar ? "En dólares" : "En soles"}
            </span>
          </Switch>

          <Chip className="text-foreground text-xs" variant="faded">
            <span>Tipo de cambio: {exchange?.value}</span>
          </Chip>

          {exchange?.updatedAt && (
            <Chip className="text-foreground text-xs" variant="flat">
              <span>
                Actualizado: {convertFormatDistanceToNow(exchange?.createdAt)}
              </span>
            </Chip>
          )}
        </div>
      </div>
      <div className="col-span-12 md:col-span-3">
        <ReportProvisionAmountRecord
          Icon={<PiHandCoins className="text-cerulean-800" size={64} />}
          currency={isDollar ? "" : ""}
          title="Monto ahorrado"
          total={calculateTotal(isDollar, data?.savingAmount?.report)}
        />
      </div>
      <div className="col-span-12 md:col-span-3">
        <ReportProvisionAmountRecord
          Icon={<PiHandCoins className="text-cerulean-800" size={64} />}
          currency={isDollar ? "" : ""}
          title="Monto demandado"
          total={calculateTotal(isDollar, data?.amountSum?.report)}
        />
      </div>
      <div className="col-span-12 md:col-span-3">
        <ReportProvisionAmountRecord
          Icon={<PiHandCoins className="text-cerulean-800" size={64} />}
          currency={isDollar ? "" : ""}
          title="Monto provisionado"
          total={calculateTotal(isDollar, data?.provisionAmount.report)}
        />
      </div>
      <div className="col-span-12 md:col-span-3">
        <ReportCountRecord
          Icon={<RiAuctionLine className="text-cerulean-800" size={48} />}
          description="PROCESOS"
          title="N° de Expediente"
          total={totalJudicialProcess}
        />
      </div>
      <div className="col-span-6">
        <ReportChartDataGrid<GetContingenciesReportDto>
          cells={renderContingenciesCell}
          columns={judicialProcessContingenciesColumns}
          dataGridKey="name"
          items={data ? data?.contingencies.report : []}
        />
      </div>
      <div className="col-span-6">
        <ReportChartDataGrid<GetMasterOptionReportDto>
          cells={renderCriticalProcessesCell}
          columns={judicialProcessCriticalProcessesColumns}
          dataGridKey="name"
          items={data ? data?.criticalProcesses.report : []}
        />
      </div>
      <div className="col-span-12">
        <PieChart<GetMasterOptionReportDto>
          cells={renderCausesCell}
          chartData={causesChartData}
          columns={causesColumns}
          items={data?.causes.report}
          title="N° de procesos por causa/raíz"
          type={PieChartType.column}
        />
      </div>
      <div className="col-span-12">
        <HorizontalBarChart<GetContingenciesReportDto>
          cells={renderInternalSpecialistBarChartCell}
          chartData={internalSpecialistData}
          columns={internalSpecialistColumns}
          items={data?.internalSpecialists.report}
          title="N° de procesos por especialista interno"
          yAxisData={internalSpecialistYAxisData}
        />
      </div>
      <div className="col-span-12">
        <PieChart<GetMasterOptionReportDto>
          cells={renderPieChartCell}
          chartData={matterChartData}
          columns={judicialProcessPieBarColumns}
          items={data?.matters.report[0]?.Submodule}
          title="N° de procesos por materias"
          type={PieChartType.column}
        />
      </div>
      <div className="col-span-12">
        <HorizontalBarChart<GetInstancesReportDto>
          cells={renderInstanceBarChartCell}
          chartData={instanceChartData}
          columns={judicialProcessInstanceHorizontalBarColumns}
          dataGridKey="instanceName"
          items={data?.instances?.report ?? []}
          title="N° de procesos por instancia"
          yAxisData={instanceYAxisData}
        />
      </div>
      {data && data?.studio.report[0]?.masterOption.length > 0 && (
        <div className="col-span-12">
          <HorizontalBarChart<GetMasterOptionReportDto>
            cells={renderBarChartCell}
            chartData={studioChartData}
            columns={judicialProcessHorizontalBarColumns}
            items={data?.studio.report[0]?.masterOption}
            title="N° de procesos por estudio"
            yAxisData={studioYAxisData}
          />
        </div>
      )}
    </div>
  );
};

export default ReportJudicialProcess;
