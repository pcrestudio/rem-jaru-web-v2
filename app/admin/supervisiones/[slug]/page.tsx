"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import SupervisionDataGrid from "@/app/admin/supervisiones/[slug]/components/supervision-datagrid/SupervisionDataGrid";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import { toggleSupervision } from "@/app/api/supervision/supervision";

export default function SupervisionSlug() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const [confirm, setConfirm] = useState<boolean>(false);
  const [supervision, setSupervision] = useState<GetSupervisionDto | null>(
    null,
  );
  const toggleSelectedItem = (supervision: GetSupervisionDto) => {
    setSupervision(supervision);
    setConfirm(true);
  };

  const toggleSupervisionProcessHelper = async () => {
    const { data } = await toggleSupervision({
      id: supervision.id,
      isActive: Boolean(supervision.isActive),
    });

    if (data) {
      toast.success("El expediente se eliminó.");
      setConfirm(false);
    }
  };

  const handleConfirmModalClose = () => {
    setSupervision(null);
    setConfirm(false);
  };

  return (
    <div className="short-form-layout">
      <BreadcrumbsPath pathname={pathname} />
      <ConfirmModal
        description={{
          __html: `Estás seguro de realizar esta acción, este expediente será eliminado de la plataforma. Para recuperarlo debes contactarte con soporte.`,
        }}
        isOpen={confirm}
        title={`¿Deseas eliminar el expediente?`}
        onClose={handleConfirmModalClose}
        onConfirm={toggleSupervisionProcessHelper}
      />

      <SupervisionDataGrid
        slug={slug}
        toggleSelectedItem={toggleSelectedItem}
      />
    </div>
  );
}
