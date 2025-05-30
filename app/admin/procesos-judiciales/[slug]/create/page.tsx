"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { CreateJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/create-judicial-process.dto";
import { createJudicialProcess } from "@/app/api/judicial-process/judicial-process";
import JudicialProcessForm from "@/app/admin/procesos-judiciales/components/JudicialProcessForm";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import useStore from "@/lib/store";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import BackdropLoading from "@/app/commons/components/BackdropLoading/BackdropLoading";

export default function ProcesosJudicialesSlugCreate() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const [confirm, setConfirm] = useState<boolean>(false);
  const router = useRouter();
  const [judicialProcessId, setJudicialProcessId] = useState<number | null>(
    null,
  );
  const { user } = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmModalClose = () => setConfirm(false);

  const redirectToEdit = async () => {
    const currentPath = window.location.pathname;

    return router.push(
      `${currentPath.replace("create", "edit")}/${judicialProcessId}`,
      {},
    );
  };

  const onSubmit = async (payload: CreateJudicialProcessDto) => {
    try {
      setLoading(true);

      const { data } = await createJudicialProcess(
        {
          ...payload,
          cargoStudioId:
            user.studioId !== 0 ? user.studioId : payload.cargoStudioId,
        },
        slug,
      );

      if (data) {
        setJudicialProcessId(Number(data["id"]));
        setConfirm(true);
      }

      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (judicialProcessId !== null) {
      return;
    }
  }, [judicialProcessId]);

  return (
    <>
      <BackdropLoading loading={loading} />

      <div className="short-form-layout">
        <h1 className="text-2xl font-bold">Nuevo Proceso Judicial</h1>
        <ConfirmModal
          description={{
            __html: `El expediente ha sido agregado con éxito. ¿Deseas configurar algunos datos extras?`,
          }}
          isOpen={confirm}
          title="Expediente agregado."
          onClose={handleConfirmModalClose}
          onConfirm={redirectToEdit}
        />
        <BreadcrumbsPath pathname={pathname} />
        <JudicialProcessForm
          handleSubmit={onSubmit}
          pathname={pathname}
          slug={mappingRevertSubmodules[slug]}
        />
      </div>
    </>
  );
}
