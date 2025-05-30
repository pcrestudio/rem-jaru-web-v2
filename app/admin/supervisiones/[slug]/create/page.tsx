"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import SupervisionForm from "@/app/admin/supervisiones/[slug]/components/supervision-form/SupervisionForm";
import { CreateSupervisionDto } from "@/app/dto/supervision/create-supervision.dto";
import { createSupervision } from "@/app/api/supervision/supervision";
import useStore from "@/lib/store";
import BackdropLoading from "@/app/commons/components/BackdropLoading/BackdropLoading";

export default function SupervisionesSlugCreate() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const [supervisionId, setSupervisionId] = useState<number | null>(null);
  const { user } = useStore();
  const [confirm, setConfirm] = useState<boolean>(false);
  const handleConfirmModalClose = () => {
    setConfirm(false);
  };
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const redirectToEdit = async () => {
    const currentPath = window.location.pathname;

    return router.push(
      `${currentPath.replace("create", "edit")}/${supervisionId}`,
      {},
    );
  };

  const handleSubmit = async (payload: CreateSupervisionDto) => {
    try {
      setLoading(true);

      const { data } = await createSupervision(
        {
          ...payload,
          cargoStudioId:
            user.studioId !== 0 ? user.studioId : payload.cargoStudioId,
        },
        slug,
      );

      if (data) {
        setSupervisionId(data["id"]);
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
    if (supervisionId !== null) return;
  }, [supervisionId]);

  return (
    <>
      <BackdropLoading loading={loading} />

      <div className="short-form-layout">
        <h1 className="text-2xl font-bold">Nueva Supervisión</h1>
        <ConfirmModal
          description={{
            __html: `La ficha de supervisión ha sido agregado con éxito. ¿Deseas configurar algunos datos extras?`,
          }}
          isOpen={confirm}
          title="Supervisión agregada."
          onClose={handleConfirmModalClose}
          onConfirm={redirectToEdit}
        />
        <BreadcrumbsPath pathname={pathname} />

        <SupervisionForm
          handleSubmit={handleSubmit}
          pathname={pathname}
          slugSubmodule={slug}
        />
      </div>
    </>
  );
}
