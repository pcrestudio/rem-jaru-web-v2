import { Tab, Tabs } from "@nextui-org/react";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { MasterOptionConfig } from "@/config/master-option.config";
import useSWR from "swr";
import { Key, useState } from "react";
import { MasterReportTabs } from "@/config/master-report-tabs.config";
import ReportByTodo from "@/app/admin/reportes/components/ReportByTodo/ReportByTodo";

const ReportTabs = () => {
  const { data } = useSWR<GetMastersDto>(
    `${environment.baseUrl}/masters/report?slug=${MasterOptionConfig.reportTabs}`,
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
        onSelectionChange={handleSelectionChange}
        variant="underlined"
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
