import { GlobalFilter } from "@/lib/types/filter.type";
import { FC } from "react";
import { GetMasterOptionReportDto } from "@/app/dto/report/get-init-report.dto";
import HorizontalBarChart from "@/app/admin/reportes/components/bar/HorizontalBarChart/HorizontalBarChart";
import judicialProcessHorizontalBarColumns from "@/app/admin/reportes/components/ReportChartDataGrid/columns/judicialProcessHorizontalBarColumns";
import PieChart from "@/app/admin/reportes/components/pie/PieChart/PieChart";
import judicialProcessPieBarColumns from "@/app/admin/reportes/components/ReportChartDataGrid/columns/judicialProcessPieBarColumns";
import useReportJudicialProcess from "@/app/admin/reportes/hooks/useReportJudicialProcess";
import ReportCountRecord from "@/app/admin/reportes/components/ReportCountRecord/ReportCountRecord";
import { RiAuctionLine } from "react-icons/ri";
import ReportProvisionAmountRecord from "@/app/admin/reportes/components/ReportProvisionAmountRecord/ReportProvisionAmountRecord";
import { PiHandCoins } from "react-icons/pi";
import judicialProcessContingenciesColumns from "@/app/admin/reportes/components/ReportChartDataGrid/columns/judicialProcessContingenciesColumns";
import ReportChartDataGrid from "@/app/admin/reportes/components/ReportChartDataGrid/ReportChartDataGrid";
import judicialProcessCriticalProcessesColumns from "@/app/admin/reportes/components/ReportChartDataGrid/columns/judicialProcessCriticalProcessesColumns";

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
      <div className="col-span-4">
        <ReportProvisionAmountRecord
          title="Monto provisionado"
          total={data?.provisionAmount.report}
          Icon={
            <PiHandCoins className="text-cerulean-800" size={64}></PiHandCoins>
          }
        />
      </div>
      <div className="col-span-12 md:col-span-4">
        <ReportCountRecord
          title="N° de Expediente"
          total={totalJudicialProcess}
          description="PROCESOS JUDICIALIZADOS"
          Icon={<RiAuctionLine className="text-cerulean-800" size={48} />}
        />
      </div>
      <div className="col-span-6">
        <ReportChartDataGrid<GetMasterOptionReportDto>
          items={data ? data?.contingencies.report : []}
          dataGridKey="name"
          cells={renderContingenciesCell}
          columns={judicialProcessContingenciesColumns}
        />
      </div>
      <div className="col-span-6">
        <ReportChartDataGrid<GetMasterOptionReportDto>
          items={data ? data?.criticalProcesses.report : []}
          dataGridKey="name"
          cells={renderContingenciesCell}
          columns={judicialProcessCriticalProcessesColumns}
        />
      </div>
      <div className="col-span-12">
        <PieChart<GetMasterOptionReportDto>
          title="N° de procesos judiciales por materias"
          chartData={matterChartData}
          cells={renderPieChartCell}
          columns={judicialProcessPieBarColumns}
          items={data?.matters.report[0].Submodule}
        />
      </div>
      <div className="col-span-6"></div>
      <div className="col-span-6">
        <HorizontalBarChart<GetMasterOptionReportDto>
          title="N° de procesos judiciales por estudio"
          yAxisData={studioYAxisData}
          chartData={studioChartData}
          cells={renderBarChartCell}
          columns={judicialProcessHorizontalBarColumns}
          items={data?.studio.report[0].masterOption}
        />
      </div>
    </div>
  );
};

export default ReportJudicialProcess;
