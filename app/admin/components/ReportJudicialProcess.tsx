import React, { FC } from "react";
import { PiHandCoins } from "react-icons/pi";
import { RiAuctionLine } from "react-icons/ri";

import { GlobalFilter } from "@/lib/types/filter.type";
import useReportJudicialProcess from "@/app/admin/hooks/useReportJudicialProcess";
import ReportCountRecord from "@/app/admin/components/ReportCountRecord/ReportCountRecord";
import ReportChartDataGrid from "@/app/admin/components/ReportChartDataGrid/ReportChartDataGrid";
import judicialProcessCriticalProcessesColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessCriticalProcessesColumns";
import { GetMasterOptionReportDto } from "@/app/dto/report/get-init-report.dto";
import HorizontalBarChart from "@/app/admin/components/bar/HorizontalBarChart/HorizontalBarChart";
import judicialProcessHorizontalBarColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessHorizontalBarColumns";
import ReportProvisionAmountRecord from "@/app/admin/components/ReportProvisionAmountRecord/ReportProvisionAmountRecord";
import judicialProcessContingenciesColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessContingenciesColumns";
import PieChart from "@/app/admin/components/pie/PieChart/PieChart";
import judicialProcessPieBarColumns from "@/app/admin/components/ReportChartDataGrid/columns/judicialProcessPieBarColumns";

interface ReportJudicialProcess {
  filter: GlobalFilter;
}

const ReportJudicialProcess: FC<ReportJudicialProcess> = ({ filter }) => {
  const {
    matterChartData,
    renderPieChartCell,
    renderBarChartCell,
    renderContingenciesCell,
    data,
    studioChartData,
    studioYAxisData,
    totalJudicialProcess,
  } = useReportJudicialProcess(filter);

  return (
    <div className="grid grid-cols-12 items-stretch gap-10">
      <div className="col-span-12 md:col-span-6">
        <ReportProvisionAmountRecord
          Icon={<PiHandCoins className="text-cerulean-800" size={64} />}
          title="Monto provisionado"
          total={data?.provisionAmount.report}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        <ReportCountRecord
          Icon={<RiAuctionLine className="text-cerulean-800" size={48} />}
          description="PROCESOS JUDICIALIZADOS"
          title="N° de Expediente"
          total={totalJudicialProcess}
        />
      </div>
      <div className="col-span-6">
        <ReportChartDataGrid<GetMasterOptionReportDto>
          cells={renderContingenciesCell}
          columns={judicialProcessContingenciesColumns}
          dataGridKey="name"
          items={data ? data?.contingencies.report : []}
        />
      </div>
      <div className="col-span-6">
        <ReportChartDataGrid<GetMasterOptionReportDto>
          cells={renderContingenciesCell}
          columns={judicialProcessCriticalProcessesColumns}
          dataGridKey="name"
          items={data ? data?.criticalProcesses.report : []}
        />
      </div>
      <div className="col-span-12">
        <PieChart<GetMasterOptionReportDto>
          cells={renderPieChartCell}
          chartData={matterChartData}
          columns={judicialProcessPieBarColumns}
          items={data?.matters.report[0].Submodule}
          title="N° de procesos judiciales por materias"
        />
      </div>
      <div className="col-span-6" />
      <div className="col-span-6">
        <HorizontalBarChart<GetMasterOptionReportDto>
          cells={renderBarChartCell}
          chartData={studioChartData}
          columns={judicialProcessHorizontalBarColumns}
          items={data?.studio.report[0].masterOption}
          title="N° de procesos judiciales por estudio"
          yAxisData={studioYAxisData}
        />
      </div>
    </div>
  );
};

export default ReportJudicialProcess;
