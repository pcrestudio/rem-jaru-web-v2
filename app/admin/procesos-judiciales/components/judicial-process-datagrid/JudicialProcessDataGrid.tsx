import { FC, useCallback } from "react";
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";
import { Chip } from "@heroui/chip";
import { useRouter } from "next/navigation";

import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import judicialProcessColumns from "@/app/admin/procesos-judiciales/components/judicial-process-datagrid/columns/judicialProcessColumns";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { exportJudicialProcessExcel } from "@/app/api/judicial-process/judicial-process";
import exportableExcel from "@/utils/exportable_excel";
import useStore from "@/lib/store";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";

export interface JudicialProcessDataGridProps {
  toggleSelectedItem: (judicialProcess: GetJudicialProcessDto) => void;
  slug?: string;
}

const JudicialProcessDataGrid: FC<JudicialProcessDataGridProps> = ({
  toggleSelectedItem,
  slug,
}) => {
  const router = useRouter();
  const { user } = useStore();

  const renderCell = useCallback(
    (judicialProcess: GetJudicialProcessDto, columnKey: string | number) => {
      const cellValue = judicialProcess[columnKey];

      let selectedInstance = judicialProcess.stepData.reduce(
        (latestInstance, currentStep) => {
          const currentInstance = currentStep.step.instance;

          if (!latestInstance || currentInstance.id > latestInstance.id) {
            return currentInstance;
          }

          return latestInstance;
        },
        null,
      );

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar expediente">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => {
                    const currentPath = window.location.pathname;

                    router.push(`${currentPath}/edit/${judicialProcess?.id}`);
                  }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Desactivar expediente">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => toggleSelectedItem(judicialProcess)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );

        case "responsibleId":
          return (
            <p>
              {judicialProcess.responsible
                ? `${judicialProcess.responsible.firstName} ${judicialProcess.responsible.lastName}`
                : "-"}
            </p>
          );

        case "secondaryResponsibleId":
          return (
            <p>
              {judicialProcess.secondaryResponsible
                ? `${judicialProcess.secondaryResponsible.firstName} ${judicialProcess.secondaryResponsible.lastName}`
                : "-"}
            </p>
          );

        case "projectId":
          return (
            <p>
              {judicialProcess.project
                ? `${judicialProcess.project.name}`
                : "-"}
            </p>
          );

        case "cargoStudioId":
          return (
            <p>
              {judicialProcess.studio ? `${judicialProcess.studio.name}` : "-"}
            </p>
          );

        case "instance":
          return (
            <p>{selectedInstance ? `${selectedInstance["name"]}` : "-"}</p>
          );

        case "isActive":
          return (
            <Chip className={cellValue ? "bg-green-100 text-green-900" : ""}>
              {cellValue ? "Activo" : "Inactivo"}
            </Chip>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <CustomDataGrid<GetJudicialProcessDto>
      hasAddButton
      hasExcelButton
      addButtonText="Nuevo proceso judicial"
      canUse={canUse(user.role, CanUsePermission.addItem)}
      canUseExportable={canUse(user.role, CanUsePermission.downloadExcel)}
      cells={renderCell}
      columns={judicialProcessColumns}
      emptyContent="Sin procesos judiciales."
      endpointUrl={`judicial_processes?slug=${mappingRevertSubmodules[slug]}&`}
      onAddChange={() => {
        const currentPath = window.location.pathname;

        router.push(`${currentPath}/create`);
      }}
      onExportableExcel={async () => {
        const response = await exportJudicialProcessExcel();

        exportableExcel(response);
      }}
    />
  );
};

export default JudicialProcessDataGrid;
