import React, { FC, useCallback, useState } from "react";
import { Accordion, AccordionItem, Tooltip } from "@heroui/react";
import toast from "react-hot-toast";
import { EditIcon } from "@heroui/shared-icons";

import { ModularProps } from "@/app/admin/procesos-judiciales/types/ModularProps";
import ReclaimsModalForm from "@/app/commons/components/ReclaimsModalForm/ReclaimsModalForm";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import reclaimsColumns from "@/app/commons/components/Reclaims/columns/reclaimsColumns";
import capitalize from "@/utils/capitalize";
import { upsertReclaims } from "@/app/api/reclaims/reclaims";

const Reclaims: FC<ModularProps> = ({ provision, modelType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reclaim, setReclaim] = useState<UpsertReclaimDto | null>(null);

  const selectItem = (item: UpsertReclaimDto) => {
    setReclaim(item);
    setIsOpen(true);
  };

  const handleOnCloseChange = () => {
    setReclaim(null);
    setIsOpen(false);
  };

  const handleSubmit = async (payload: UpsertReclaimDto, reset: any) => {
    let amount = 0;

    let amountValidation = 0;
    const validation = process.env.NEXT_PUBLIC_RECLAIMS_VALIDATION;

    if (payload.amount) {
      amount = Number(payload.amount) + amount;
    }

    if (
      payload.provisionAmount ||
      payload.posibleAmount ||
      payload.remoteAmount
    ) {
      amountValidation =
        payload?.provisionAmount +
        payload?.posibleAmount +
        payload?.remoteAmount;
    }

    if (amountValidation > amount && validation === "true") {
      toast.error(
        `Los montos no coinciden, el monto petitorio demandado es: S/. ${amount}, y el actual petitorio excede con una cantidad de: S/. ${amountValidation}`,
        {
          duration: 7000,
        },
      );

      return;
    } else {
      const reclaims: UpsertReclaimDto[] = [{ ...payload }];

      const response = await upsertReclaims(
        reclaims,
        provision?.entityReference,
        modelType,
      );

      if (response.data) {
        toast.success(
          payload.reclaimId
            ? "Petitorio editado correctamente."
            : "Petitorio guardado correctamente.",
        );
        setReclaim(null);
        setIsOpen(false);
        reset();
      }
    }
  };

  const renderCell = useCallback(
    (item: UpsertReclaimDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar petitorio">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => selectItem(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
            </div>
          );

        case "contingencyLevel":
          return <span>{capitalize(item.contingencyLevel)}</span>;

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <>
      <ReclaimsModalForm
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        reclaim={reclaim}
        title="Nuevo petitorio"
        onCloseChange={handleOnCloseChange}
      />

      <Accordion
        key="Petitorios"
        className="col-span-12 order-2"
        itemClasses={{
          title: "text-cerulean-950 font-bold text-lg",
          base: "pb-4 shadow-none border border-slate-200",
          trigger: "border-b-red-500 pt-4 pb-1",
        }}
        selectionMode="single"
        variant="splitted"
      >
        <AccordionItem title="Petitorios">
          <div className="flex flex-col gap-4">
            <CustomDataGrid<UpsertReclaimDto>
              hasAddButton
              addButtonText="Nuevo petitorio"
              cells={renderCell}
              columns={reclaimsColumns}
              dataGridKey="reclaimId"
              endpointUrl={`reclaims?entityReference=${provision.entityReference}&modelType=${modelType}&`}
              totalItemsText="Petitorios totales:"
              onAddChange={() => setIsOpen(true)}
            />
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Reclaims;
