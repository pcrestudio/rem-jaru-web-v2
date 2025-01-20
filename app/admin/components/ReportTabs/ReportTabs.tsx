import { Tab, Tabs } from "@heroui/react";
import useSWR from "swr";
import { Key, useState } from "react";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { MasterOptionConfig } from "@/config/master-option.config";
import { MasterReportTabs } from "@/config/master-report-tabs.config";
import ReportByTodo from "@/app/admin/components/ReportByTodo/ReportByTodo";
import ReportByContingencyLevel from "@/app/admin/components/ReportByContingencyLevel/ReportByContingencyLevel";
import ReportByResponsible from "@/app/admin/components/ReportByResponsible/ReportByResponsible";
import ReportByPerson from "@/app/admin/components/ReportByPerson/ReportByPerson";
import ReportByStudio from "@/app/admin/components/ReportByStudio/ReportByStudio";
import useStore from "@/lib/store";

const ReportTabs = () => {
  const { filter } = useStore();

  const { data } = useSWR<GetMastersDto>(
    `${environment.baseUrl}/masters/report?slug=${MasterOptionConfig.reportTabs}${filter.queryReport ? filter.queryReport.replace("?", "&") : ""}`,
    fetcher,
  );

  const [selected, setSelected] = useState<string>(
    `${MasterReportTabs.byTodos}`,
  );

  const handleSelectionChange = (key: Key) => {
    setSelected(key.toString());
  };

  const renderTabContent = (key: string) => {
    switch (key) {
      case MasterReportTabs.byTodos:
        return <ReportByTodo slug={key} />;

      case MasterReportTabs.byContingencyLevel:
        return <ReportByContingencyLevel slug={key} />;

      case MasterReportTabs.byResponsible:
        return <ReportByResponsible slug={key} />;

      case MasterReportTabs.byPlaintiff:
        return <ReportByPerson slug={key} />;

      case MasterReportTabs.byDemanded:
        return <ReportByPerson slug={key} />;

      case MasterReportTabs.byStudio:
        return <ReportByStudio />;

      default:
        return <p>Contenido para otra pestaña</p>;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        items={data ? data.masterOption : []}
        selectedKey={selected}
        variant="underlined"
        onSelectionChange={handleSelectionChange}
      >
        {(item) => (
          <Tab key={item.name} title={item.name}>
            {renderTabContent(item.slug)}{" "}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ReportTabs;
