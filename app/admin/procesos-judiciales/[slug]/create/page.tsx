"use client";

import { CreateJudicialProcessDto } from "@/app/dto/submodule/judicial_process/create-judicial-process.dto";
import getSectionAttributesSlug from "@/utils/get_section_attributes_slug";
import { createJudicialProcess } from "@/app/api/judicial-process/judicial-process";
import { createSectionAttributeValue } from "@/app/api/attribute-values/atrribute-values";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import JudicialProcessForm from "@/app/admin/procesos-judiciales/components/JudicialProcessForm";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import React, { useEffect, useState } from "react";

export default function ProcesosJudicialesSlugCreate() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const [confirm, setConfirm] = useState<boolean>(false);
  const router = useRouter();
  const [judicialProcessId, setJudicialProcessId] = useState<number | null>(
    null,
  );

  const handleConfirmModalClose = () => setConfirm(false);

  const redirectToEdit = async () => {
    const currentPath = window.location.pathname;

    return router.push(
      `${currentPath.replace("create", "edit")}/${judicialProcessId}`,
      {},
    );
  };

  const onSubmit = async (payload: CreateJudicialProcessDto) => {
    const customFields = getSectionAttributesSlug(payload);

    const { data } = await createJudicialProcess(
      {
        ...payload,
      },
      slug,
    );

    if (data) {
      setJudicialProcessId(Number(data["result"]["id"]));

      if (customFields.length > 0) {
        const response = await createSectionAttributeValue({
          attributes: customFields,
          entityReference: data["result"]["entityReference"],
        });

        if (response.data) {
          toast.success("Expediente creado con éxito");
          setConfirm(true);
        }
      } else {
        setConfirm(true);
        toast.success("Expediente creado con éxito");
      }
    }

    return data;
  };

  useEffect(() => {
    if (judicialProcessId !== null) {
      return;
    }
  }, [judicialProcessId]);

  return (
    <div className="short-form-layout">
      <h1 className="text-2xl font-bold">Nuevo Proceso Judicial</h1>
      <ConfirmModal
        title="Expediente agregado."
        description={{
          __html: `El expediente ha sido agregado con éxito. ¿Deseas configurar algunos datos extras?`,
        }}
        isOpen={confirm}
        onClose={handleConfirmModalClose}
        onConfirm={redirectToEdit}
      />
      <BreadcrumbsPath pathname={pathname} />
      <JudicialProcessForm handleSubmit={onSubmit} pathname={pathname} />
    </div>
  );
}
