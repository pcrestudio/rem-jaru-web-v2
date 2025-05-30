import React, { FC, useCallback, useState } from "react";
import { Accordion, AccordionItem, Tooltip } from "@heroui/react";
import toast from "react-hot-toast";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";

import { ModularProps } from "@/app/admin/procesos-judiciales/types/ModularProps";
import ReclaimsModalForm from "@/app/commons/components/ReclaimsModalForm/ReclaimsModalForm";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import reclaimsColumns from "@/app/commons/components/Reclaims/columns/reclaimsColumns";
import capitalize from "@/utils/capitalize";
import { deleteReclaim, upsertReclaims } from "@/app/api/reclaims/reclaims";
import useStore from "@/lib/store";
import { onlyAdmins } from "@/config/menu-options";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

const Reclaims: FC<ModularProps> = ({ provision, modelType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [reclaim, setReclaim] = useState<UpsertReclaimDto | null>(null);
  const { user } = useStore();

  const selectItem = (item: UpsertReclaimDto) => {
    setReclaim(item);
    setIsOpen(true);
  };

  const handleOnCloseChange = () => {
    setReclaim(null);
    setIsOpen(false);
  };

  const handleSubmit = async (payload: UpsertReclaimDto, reset: any) => {
    const validation = process.env.NEXT_PUBLIC_RECLAIMS_VALIDATION;

    const amount = Number(payload.amount ?? 0);

    const provisionAmount = Number(payload.provisionAmount ?? 0);
    const posibleAmount = Number(payload.posibleAmount ?? 0);
    const remoteAmount = Number(payload.remoteAmount ?? 0);

    const amountValidation = provisionAmount + posibleAmount + remoteAmount;
    const difference = amountValidation - amount;

    if (validation === "true" && amountValidation !== amount) {
      const mensaje =
        difference > 0
          ? `excede en S/. ${difference}`
          : `es menor por S/. ${Math.abs(difference)}`;

      toast.error(
        `La suma de los montos ingresados ${mensaje} respecto al monto demandado (S/. ${amount}).
         
          Detalle:
          - Provisión: S/. ${provisionAmount}
          - Posible: S/. ${posibleAmount}
          - Remoto: S/. ${remoteAmount}
          - Total ingresado: S/. ${amountValidation}`,
        { duration: 8000 },
      );
      return;
    }

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
  };

  const handleDeleteReclaim = (reclaim: UpsertReclaimDto) => {
    setReclaim(reclaim);
    setConfirm(true);
  };

  const toggleDeleteHelper = async () => {
    try {
      await deleteReclaim(reclaim);
      toast.success("Petitorio eliminado.");
    } catch (error) {
      toast.error(error.message);
      setReclaim(null);
      setConfirm(false);
    } finally {
      setReclaim(null);
      setConfirm(false);
    }
  };

  const handleDeleteConfirmClose = () => {
    setConfirm(false);
    setReclaim(null);
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

              {user && onlyAdmins.includes(user.role) && (
                <Tooltip content="Eliminar petitorio">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    role="presentation"
                    onClick={() => handleDeleteReclaim(item)}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              )}
            </div>
          );

        case "contingencyLevel":
          return <span>{capitalize(item.contingencyLevel)}</span>;

        case "provisionAmount":
          return <span>{item.provisionAmount ? item.provisionAmount : 0}</span>;

        case "posibleAmount":
          return <span>{item.posibleAmount ? item.posibleAmount : 0}</span>;

        case "remoteAmount":
          return <span>{item.remoteAmount ? item.remoteAmount : 0}</span>;

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
          __html: `¿Desea eliminar este petitorio? Esta acción no se podrá revertir.`,
        }}
        isOpen={confirm}
        title={`Eliminar Petitorio`}
        onClose={handleDeleteConfirmClose}
        onConfirm={() => toggleDeleteHelper()}
      />

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
              emptyContent="Sin petitorios."
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
