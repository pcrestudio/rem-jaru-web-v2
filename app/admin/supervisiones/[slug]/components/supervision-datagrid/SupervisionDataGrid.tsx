import { useRouter } from "next/navigation";
import React, { FC, Key } from "react";
import useSWR from "swr";
import { Tooltip } from "@heroui/react";
import { EditIcon } from "@heroui/shared-icons";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { supervisionColumns } from "@/app/admin/supervisiones/[slug]/components/supervision-datagrid/columns/supervisionColumns";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import { environment } from "@/environment/environment";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { fetcher } from "@/config/axios.config";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import useStore from "@/lib/store";
import exportableExcel from "@/utils/exportable_excel";
import { exportSupervisionExcel } from "@/app/api/supervision/supervision";

interface SupervisionDataGrid {
  slug?: string;
}

const SupervisionDataGrid: FC<SupervisionDataGrid> = ({ slug }) => {
  const router = useRouter();
  const { data } = useSWR<GetSupervisionDto[]>(
    `${environment.baseUrl}/supervisions?slug=${mappingRevertSubmodules[slug]}`,
    fetcher,
  );
  const { user } = useStore();

  const handleEditSupervision = (key: Key) => {
    const currentPath = window.location.pathname;

    router.push(`${currentPath}/edit/${key}`);
  };

  const renderCell = React.useCallback(
    (item: GetSupervisionDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      let selectedInstance = item.stepData.reduce(
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
        case "project":
          return item.project.name;

        case "responsible_id":
          return (
            <p>{item.responsible ? `${item.responsible.displayName} ` : "-"}</p>
          );

        case "cargoStudioId":
          return <p>{item.studio ? `${item.studio.name}` : "-"}</p>;

        case "authority":
          return item.authority.name;

        case "situation":
          return item.situation.name;

        case "instance":
          return (
            <p>{selectedInstance ? `${selectedInstance["name"]}` : "-"}</p>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar supervisión">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 action-button"
                  role="presentation"
                  onClick={() => {
                    const currentPath = window.location.pathname;

                    router.push(`${currentPath}/edit/${item?.id}`);
                  }}
                >
                  <EditIcon />
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
    <CustomDataGrid<GetSupervisionDto>
      hasAddButton
      hasExcelButton
      addButtonText="Nueva supervisión"
      canUse={canUse(user.role, CanUsePermission.addItem)}
      canUseExportable={canUse(user.role, CanUsePermission.downloadExcel)}
      cells={renderCell}
      columns={supervisionColumns}
      emptyContent="Sin supervisiones."
      endpointUrl={`supervisions?slug=${mappingRevertSubmodules[slug]}&`}
      items={data ?? []}
      onAddChange={() => {
        const currentPath = window.location.pathname;

        router.push(`${currentPath}/create`);
      }}
      onExportableExcel={async () => {
        const response = await exportSupervisionExcel();

        exportableExcel(response);
      }}
      onRowAction={handleEditSupervision}
    />
  );
};

export default SupervisionDataGrid;
