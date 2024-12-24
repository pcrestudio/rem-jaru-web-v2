"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import JudicialProcessDataGrid from "@/app/admin/procesos-judiciales/components/judicial-process-datagrid/JudicialProcessDataGrid";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import { toggleJudicialProcess } from "@/app/api/judicial-process/judicial-process";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";

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

  return (
    <div className="short-form-layout">
      <BreadcrumbsPath pathname={pathname} />
      <ConfirmModal
        description={{
          __html: `Estás seguro de realizar esta acción, este expediente no será eliminado y tampoco podrá utilizarse como medio de extracción para la plataforma <b>CEJ</b>.`,
        }}
        isOpen={confirm}
        title={`${judicialProcess ? `¿Deseas ${judicialProcess.isActive ? "desactivar" : "activar"} el expediente?` : ""}`}
        onClose={handleConfirmModalClose}
        onConfirm={toggleJudicialProcessHelper}
      />
      <JudicialProcessDataGrid
        slug={slug}
        toggleSelectedItem={toggleSelectedItem}
      />
    </div>
  );
}
