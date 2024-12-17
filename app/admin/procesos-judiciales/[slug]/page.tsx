"use client";

import JudicialProcessDataGrid from "@/app/admin/procesos-judiciales/components/judicial-process-datagrid/JudicialProcessDataGrid";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import { usePathname } from "next/navigation";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { useState } from "react";
import { toggleJudicialProcess } from "@/app/api/judicial-process/judicial-process";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import toast from "react-hot-toast";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import useStore from "@/lib/store";
import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";

export default function ProcesoJudicialSlug() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const [confirm, setConfirm] = useState<boolean>(false);
  const [judicialProcess, setJudicialProcess] =
    useState<GetJudicialProcessDto | null>(null);

  const toggleSelectedItem = (judicialProcess: GetJudicialProcessDto) => {
    setJudicialProcess(judicialProcess);
    setConfirm(true);
  };

  const toggleJudicialProcessHelper = async () => {
    const { data } = await toggleJudicialProcess({
      id: judicialProcess.id,
      isActive: Boolean(judicialProcess.isActive),
    });

    if (data) {
      toast.success("El expediente se actualizó correctamente.");
      setConfirm(false);
    }
  };

  const handleConfirmModalClose = () => {
    setJudicialProcess(null);
    setConfirm(false);
  };

  const { filter } = useStore();

  const { data } = useSWR<CustomDataGridPagination<GetJudicialProcessDto>>(
    `${environment.baseUrl}/judicial_processes?slug=${mappingRevertSubmodules[slug]}&page=1&pageSize=10${filter.search ? `&search=${filter.search}` : ""}`,
    fetcher,
  );

  return (
    <div className="short-form-layout">
      <BreadcrumbsPath pathname={pathname} />
      <ConfirmModal
        title={`${judicialProcess ? `¿Deseas ${judicialProcess.isActive ? "desactivar" : "activar"} el expediente?` : ""}`}
        description={{
          __html: `Estás seguro de realizar esta acción, este expediente no será eliminado y tampoco podrá utilizarse como medio de extracción para la plataforma <b>CEJ</b>.`,
        }}
        isOpen={confirm}
        onClose={handleConfirmModalClose}
        onConfirm={toggleJudicialProcessHelper}
      />
      <JudicialProcessDataGrid
        judicialProcesses={data ? data?.results : []}
        toggleSelectedItem={toggleSelectedItem}
      />
    </div>
  );
}
