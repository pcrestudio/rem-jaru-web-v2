import { FC, useCallback } from "react";
import { Tooltip } from "@nextui-org/react";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import { DeleteIcon, EditIcon } from "@nextui-org/shared-icons";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import judicialProcessColumns from "@/app/admin/procesos-judiciales/components/judicial-process-datagrid/columns/judicialProcessColumns";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { exportJudicialProcessExcel } from "@/app/api/judicial-process/judicial-process";
import exportableExcel from "@/utils/exportable_excel";

export interface JudicialProcessDataGridProps {
  toggleSelectedItem: (judicialProcess: GetJudicialProcessDto) => void;
  slug?: string;
}

const JudicialProcessDataGrid: FC<JudicialProcessDataGridProps> = ({
  toggleSelectedItem,
  slug,
}) => {
  const router = useRouter();

  const renderCell = useCallback(
    (judicialProcess: GetJudicialProcessDto, columnKey: string | number) => {
      const cellValue = judicialProcess[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar expediente">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
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
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => toggleSelectedItem(judicialProcess)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
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
      endpointUrl={`judicial_processes?slug=${mappingRevertSubmodules[slug]}&`}
      columns={judicialProcessColumns}
      cells={renderCell}
      addButtonText="Nuevo proceso judicial"
      emptyContent="Sin procesos judiciales."
      hasAddButton
      hasExcelButton
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
