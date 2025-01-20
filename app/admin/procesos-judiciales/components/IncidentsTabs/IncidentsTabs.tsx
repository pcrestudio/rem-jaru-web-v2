import React, { FC, Key, useState } from "react";
import { Tab, Tabs } from "@heroui/react";

import { GetInstanceDto } from "@/app/dto/instance/get-instance.dto";
import IncidentsForm from "@/app/admin/procesos-judiciales/components/IncidentsForm/IncidentsForm";

export interface IncidentsFormProps {
  instance?: GetInstanceDto;
}

const renderTabContent = (key: string, instance: GetInstanceDto) => {
  switch (key) {
    default:
      return <IncidentsForm instance={instance} />;
  }
};
const IncidentsTabs: FC<IncidentsFormProps> = ({ instance }) => {
  const [selected, setSelected] = useState("Expediente Principal");

  const handleSelectionChange = (key: Key) => {
    setSelected(key.toString());
  };

  return (
    <Tabs
      aria-label="Dynamic tabs"
      items={instance ? instance.incidences : []}
      selectedKey={selected}
      variant="underlined"
      onSelectionChange={handleSelectionChange}
    >
      {(item) => (
        <Tab key={item.name} title={item.name}>
          {renderTabContent(item.name, instance)}{" "}
        </Tab>
      )}
    </Tabs>
  );
};

export default IncidentsTabs;
