import { FC } from "react";
import { useRouter } from "next/navigation";

import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import judicialProcessColumns from "@/app/admin/procesos-judiciales/components/JudicialProcessDataGrid/columns/judicialProcessColumns";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { exportJudicialProcessExcel } from "@/app/api/judicial-process/judicial-process";
import exportableExcel from "@/utils/exportable_excel";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import useCommonDossier from "@/app/admin/hooks/useCommonDossier";
import useStore from "@/lib/store";
import toast from "react-hot-toast";

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
  const { renderCell, filterByStudio } = useCommonDossier({
    toggleSelectedItem,
  });

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
      endpointUrl={`judicial_processes?slug=${mappingRevertSubmodules[slug]}&${filterByStudio}`}
      onAddChange={() => {
        const currentPath = window.location.pathname;

        router.push(`${currentPath}/create`);
      }}
      onExportableExcel={async () => {
        const response = await exportJudicialProcessExcel(
          mappingRevertSubmodules[slug],
        );

        const excelResponse = exportableExcel(response);

        if (excelResponse === "ok") {
          toast.success("Excel descargado.");
        } else {
          toast.error(`Sucedió un error ${excelResponse}`);
        }
      }}
    />
  );
};

export default JudicialProcessDataGrid;
