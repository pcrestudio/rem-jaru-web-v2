import React, { FC, useCallback, useState } from "react";
import { Accordion, AccordionItem, Tooltip } from "@heroui/react";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";
import { UpsertIncidentDataDto } from "@/app/dto/instance/upsert-incident-data.dto";
import incidencesColumns from "@/app/admin/procesos-judiciales/components/Incidences/incidencesColumns";

export interface IncidentsFormProps {
  entityReference?: string;
}

const Incidences: FC<IncidentsFormProps> = ({ entityReference }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [incidenceData, setIncidenceData] =
    useState<UpsertIncidentDataDto | null>(null);

  const selectItem = (incidence: UpsertIncidentDataDto) => {
    setIncidenceData(incidence);
    setIsOpen(true);
  };

  const renderCell = useCallback(
    (item: UpsertIncidentDataDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar incidencia">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => selectItem(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>

              <Tooltip content="Eliminar incidencia">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  role="presentation"
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <div className="col-span-12">
      <Accordion
        key="Incidencias"
        className="col-span-12 order-2"
        itemClasses={{
          title: "text-cerulean-950 font-bold text-lg",
          base: "pb-4 shadow-none border border-slate-200",
          trigger: "border-b-red-500 pt-4 pb-1",
        }}
        selectionMode="single"
        variant="splitted"
      >
        <AccordionItem title="Incidencias">
          <div className="flex flex-col gap-4">
            <CustomDataGrid<UpsertReclaimDto>
              hasAddButton
              addButtonText="Nueva incidencia"
              cells={renderCell}
              columns={incidencesColumns}
              dataGridKey="id"
              endpointUrl={`incident `}
              totalItemsText="Incidencias totales:"
              onAddChange={() => setIsOpen(true)}
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Incidences;
