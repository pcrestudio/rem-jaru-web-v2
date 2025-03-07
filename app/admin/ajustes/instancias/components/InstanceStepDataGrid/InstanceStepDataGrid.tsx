import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";

import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import useStore from "@/lib/store";
import { GetStepDto } from "@/app/dto/instance/get-instance.dto";
import stepColumns from "@/app/admin/ajustes/instancias/components/InstanceStepDataGrid/columns/stepColumns";
import InstanceStepSettingForm from "@/app/admin/ajustes/instancias/components/forms/InstanceStepSettingForm/InstanceStepSettingForm";
import useInstanceSetting from "@/app/admin/ajustes/instancias/hooks/useInstanceSetting";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

interface InstanceStepDataGridProps {
  steps: GetStepDto[];
  instanceId: number;
}

const InstanceStepDataGrid: FC<InstanceStepDataGridProps> = ({
  steps,
  instanceId,
}) => {
  const { user } = useStore();
  const canAdd = !canUse(user.role, CanUsePermission.addStep);

  const {
    isOpen,
    confirm,
    instanceStep,
    handleStepSettingForm,
    handleCloseStepSettingForm,
    handleStepSettingSubmit,
    handleToggleClose,
    handleToggleConfirm,
    renderCell,
  } = useInstanceSetting();

  return (
    <>
      <ConfirmModal
        description={{
          __html:
            "Por favor, verifique que no hay ningún expediente comprometido con este paso antes de eliminarlo.",
        }}
        isOpen={confirm}
        title="¿Desea eliminar el paso de esta instancia?"
        onClose={handleToggleClose}
        onConfirm={handleToggleConfirm}
      />

      <InstanceStepSettingForm
        handleSubmit={handleStepSettingSubmit}
        instanceStep={instanceStep}
        isOpen={isOpen}
        title={instanceStep ? "Editar paso" : "Nuevo paso"}
        onCloseChange={handleCloseStepSettingForm}
      />

      <Table
        bottomContent={
          <>
            <div className="flex flex-row justify-end border border-b-0 border-l-0 border-r-0 border-t-gray-200 p-3">
              <Button
                className="text-cerulean-500 text-sm flex flex-row items-center !normal-case"
                disabled={canAdd}
                endIcon={<AiOutlinePlus size={16} />}
                onClick={() => handleStepSettingForm(instanceId)}
              >
                Agregar paso
              </Button>
            </div>
          </>
        }
        classNames={{
          wrapper: "bg-transparent border-none p-0 gap-1 mb-2",
          table: "",
          th: "bg-[#919EAB14]/5 text-cerulean-950 font-bold",
          thead: "[&>tr]:first:rounded-none rounded-lg",
        }}
      >
        <TableHeader columns={stepColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Sin atributos."} items={steps ?? []}>
          {(item) => (
            <TableRow key={item.instanceId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default InstanceStepDataGrid;
