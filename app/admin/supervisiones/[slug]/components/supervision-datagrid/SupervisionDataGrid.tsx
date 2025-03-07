import { useRouter } from "next/navigation";
import React, { FC, Key } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";

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
import useCommonDossier from "@/app/admin/hooks/useCommonDossier";
import { ModelType } from "@/config/model-type.config";

interface SupervisionDataGridProps {
  toggleSelectedItem: (judicialProcess: GetSupervisionDto) => void;
  slug?: string;
}

const SupervisionDataGrid: FC<SupervisionDataGridProps> = ({
  slug,
  toggleSelectedItem,
}) => {
  const router = useRouter();
  const { data } = useSWR<GetSupervisionDto[]>(
    `${environment.baseUrl}/supervisions?slug=${mappingRevertSubmodules[slug]}`,
    fetcher,
  );
  const { user } = useStore();
  const { renderCell, filterByStudio } = useCommonDossier({
    toggleSelectedItem,
    modelType: ModelType.Supervision,
  });

  const handleEditSupervision = (key: Key) => {
    const currentPath = window.location.pathname;

    router.push(`${currentPath}/edit/${key}`);
  };

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
      endpointUrl={`supervisions?slug=${mappingRevertSubmodules[slug]}&${filterByStudio}`}
      items={data ?? []}
      onAddChange={() => {
        const currentPath = window.location.pathname;

        router.push(`${currentPath}/create`);
      }}
      onExportableExcel={async () => {
        const response = await exportSupervisionExcel(
          mappingRevertSubmodules[slug],
        );

        const excelResponse = exportableExcel(response);

        if (excelResponse === "ok") {
          toast.success("Excel descargado.");
        } else {
          toast.error(`Sucedió un error ${excelResponse}`);
        }
      }}
      onRowAction={handleEditSupervision}
    />
  );
};

export default SupervisionDataGrid;
