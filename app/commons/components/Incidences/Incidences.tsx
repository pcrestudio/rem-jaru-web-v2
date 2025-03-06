import React, { FC, useCallback, useState } from "react";
import { Accordion, AccordionItem, Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import incidencesColumns from "@/app/commons/components/Incidences/incidencesColumns";
import IncidencesForm from "@/app/commons/components/IncidencesForm/IncidencesForm";
import { UpsertIncidenceDto } from "@/app/dto/incidences/upsert-incidence.dto";
import { upsertIncidenceDto } from "@/app/api/incidences/incidences";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import { useRouter } from "next/navigation";

export interface IncidencesProps {
  entityReference?: string;
  modelType?: string;
}

const Incidences: FC<IncidencesProps> = ({ entityReference, modelType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [incidence, setIncidence] = useState<UpsertIncidenceDto | null>(null);
  const router = useRouter();

  const navigateIfIncidenceExists = async () => {
    if (id) {
      const currentPath = window.location.pathname;
      const incidences_route = currentPath.replace(/edit\/\d+/, "incidencias");

      return router.push(`${incidences_route}/${id}`);
    }
  };

  const selectItem = (incidence: UpsertIncidenceDto) => {
    setIncidence(incidence);
    setIsOpen(true);
  };

  const handleIncidenceClose = () => {
    setIncidence(incidence);
    setIsOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIncidence(null);
    setConfirm(false);
  };

  const handleSubmit = async (payload: UpsertIncidenceDto) => {
    const { data } = await upsertIncidenceDto({
      name: payload.title,
      entityReference,
      modelType,
    });

    if (data) {
      setConfirm(true);
      setIsOpen(false);
      setId(`${data?.id}-${entityReference}`);
    } else {
      toast.error("La incidencia no se pudo crear.");
    }
  };

  const renderCell = useCallback(
    (item: UpsertIncidenceDto, columnKey: string | number) => {
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
    <>
      <ConfirmModal
        description={{
          __html: `Puedes cancelar este paso si aún no necesitas configurar esta incidencia.`,
        }}
        isOpen={confirm}
        title="¿Deseas configurar esta incidencia?"
        onClose={handleConfirmModalClose}
        onConfirm={navigateIfIncidenceExists}
      />

      <IncidencesForm
        handleSubmit={handleSubmit}
        incidence={incidence}
        isOpen={isOpen}
        title="Nueva incidencia"
        onCloseChange={handleIncidenceClose}
      />

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
              <CustomDataGrid<UpsertIncidenceDto>
                hasAddButton
                addButtonText="Nueva incidencia"
                cells={renderCell}
                columns={incidencesColumns}
                dataGridKey="id"
                emptyContent="Sin incidencias."
                endpointUrl={`incident?modelType=${modelType}&entityReference=${entityReference}&`}
                totalItemsText="Incidencias totales:"
                onAddChange={() => setIsOpen(true)}
              />
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Incidences;
