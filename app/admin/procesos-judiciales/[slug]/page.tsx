"use client";

import JudicialProcessDataGrid from "@/components/admin/submodules/judicial_process/JudicialProcessDataGrid";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import { usePathname } from "next/navigation";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import JudicialProcessModal from "@/components/admin/submodules/judicial_process/JudicialProcessModal";
import React, { useState } from "react";
import { CreateJudicialProcessDto } from "@/app/dto/submodule/judicial_process/create-judicial-process.dto";
import {
  createJudicialProcess,
  editJudicialProcess,
  toggleJudicialProcess,
} from "@/app/api/judicial-process/judicial-process";
import { EditJudicialProcessDto } from "@/app/dto/submodule/judicial_process/edit-judicial-process.dto";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import toast from "react-hot-toast";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import getSectionAttributesSlug from "@/utils/get_section_attributes_slug";
import { createSectionAttributeValue } from "@/app/api/attribute-values/atrribute-values";

export default function ProcesoJudicialSlug() {
  const pathname: string = usePathname();
  const slug: string = pathname.split("/")[3];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [judicialProcess, setJudicialProcess] =
    useState<GetJudicialProcessDto | null>(null);

  const setSelectedItem = (judicialProcess: GetJudicialProcessDto) => {
    setJudicialProcess(judicialProcess);
    setTimeout(() => setIsOpen(true), 100);
  };

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

  const onSubmit = async (payload: CreateJudicialProcessDto) => {
    const customFields = getSectionAttributesSlug(payload);

    let formData = new FormData();

    const fileAttributes = customFields.filter(
      (attribute) => attribute.type === "FILE",
    );

    fileAttributes.forEach((attribute) => {
      const fileList = attribute.value;
      if (fileList && fileList.length > 0) {
        Object.keys(fileList).forEach((key) => {
          const file = fileList[key];
          formData.append(attribute.attributeSlug, file);
        });
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (judicialProcess) {
      const editPayload = payload as unknown as EditJudicialProcessDto;

      const { data } = await editJudicialProcess(
        {
          ...editPayload,
          id: judicialProcess.id,
        },
        slug,
      );

      if (data) {
        if (customFields.length > 0) {
          const response = await createSectionAttributeValue({
            attributes: customFields,
            entityReference: judicialProcess?.id,
          });

          if (response.data) {
            toast.success("Expediente modificado con éxito");
            setJudicialProcess(null);
            setIsOpen(false);
          }
        }
      }

      return data;
    }

    const { data } = await createJudicialProcess(
      {
        ...payload,
      },
      slug,
    );

    if (data) {
      if (customFields.length > 0) {
        const response = await createSectionAttributeValue({
          attributes: customFields,
          entityReference: data["id"],
        });

        if (response.data) {
          toast.success("Expediente creado con éxito");
          setIsOpen(false);
        }
      }
    }

    return data;
  };

  const handleConfirmModalClose = () => {
    setJudicialProcess(null);
    setConfirm(false);
  };

  const { data } = useSWR<GetJudicialProcessDto[]>(
    `${environment.baseUrl}/judicial_processes?slug=${mappingRevertSubmodules[slug]}`,
    fetcher,
  );

  return (
    data && (
      <div className="flex flex-col gap-6">
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
        <JudicialProcessModal
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(true)}
          onCloseChange={() => {
            setIsOpen(false);
            setJudicialProcess(null);
          }}
          title={judicialProcess ? `Editar expediente` : "Nuevo expediente"}
          handleSubmit={onSubmit}
          judicialProcess={judicialProcess}
          pathname={pathname}
        />
        <JudicialProcessDataGrid
          judicialProcesses={data}
          onOpenChange={() => setIsOpen(true)}
          setSelectedItem={setSelectedItem}
          toggleSelectedItem={toggleSelectedItem}
        />
      </div>
    )
  );
}
