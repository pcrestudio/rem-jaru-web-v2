"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import JudicialProcessDataGrid from "@/app/admin/procesos-judiciales/components/JudicialProcessDataGrid/JudicialProcessDataGrid";
import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
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
          __html: `Estás seguro de realizar esta acción, este expediente será eliminado de la plataforma y no será parte de la extracción de datos en la plataforma <b>CEJ</b>. Para recuperarlo debes contactarte con soporte.`,
        }}
        isOpen={confirm}
        title={`¿Deseas eliminar el expediente?`}
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
