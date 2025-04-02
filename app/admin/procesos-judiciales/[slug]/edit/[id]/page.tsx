"use client";

import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import { AiOutlineFileWord } from "react-icons/ai";
import { Button } from "@heroui/button";
import React from "react";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import JudicialProcessForm from "@/app/admin/procesos-judiciales/components/JudicialProcessForm";
import getSectionAttributesSlug from "@/utils/get_section_attributes_slug";
import {
  editJudicialProcess,
  exportJudicialWord,
} from "@/app/api/judicial-process/judicial-process";
import {
  createGlobalAttributeValue,
  createSectionAttributeValue,
} from "@/app/api/attribute-values/atrribute-values";
import { EditJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/edit-judicial-process.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
import useStore from "@/lib/store";
import { upsertInstanceStepData } from "@/app/api/instances/instances";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";
import getGlobalAttributesSlug from "@/utils/get_global_attributes_slug";
import exportableWord from "@/utils/exportable_word";
import { ModelType } from "@/config/model-type.config";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";

export default function ProcesosJudicialesSlugEdit() {
  const pathname = usePathname();
  const slug: string = pathname.split("/")[3];
  const id: string = pathname.split("/")[5];
  const router = useRouter();

  const { data } = useSWR<GetJudicialProcessDto>(
    `${environment.baseUrl}/judicial_processes/${id}`,
    fetcher,
  );

  const { stepDataArray } = useStore();

  const onSubmit = async (
    payload: EditJudicialProcessDto,
    _: any,
    event: any,
  ) => {
    if (event.target.id === "judicial-process-edit") {
      const customFields = getSectionAttributesSlug(payload);
      const globalFields = getGlobalAttributesSlug(payload);

      const { data } = await editJudicialProcess(
        {
          ...payload,
          id: Number(id),
        },
        slug,
      );

      if (data) {
        if (
          globalFields.length > 0 ||
          stepDataArray.length > 0 ||
          customFields.length > 0 ||
          data
        ) {
          const globalAttributeResponse = await createGlobalAttributeValue({
            attributes: globalFields,
            entityReference: data?.entityReference,
            modelType: ModelType.JudicialProcess,
          });

          const instanceResponse = await upsertInstanceStepData({
            stepData: stepDataArray as InstanceStepDataDto[],
            modelType: ModelType.JudicialProcess,
          });

          const sectionAttributeResponse = await createSectionAttributeValue({
            attributes: customFields,
            entityReference: data?.entityReference,
            modelType: ModelType.JudicialProcess,
          });

          if (
            instanceResponse.data ||
            globalAttributeResponse.data ||
            sectionAttributeResponse.data ||
            data
          ) {
            toast.success("Ficha modificada.");

            const currentPath = window.location.pathname;
            const submodule = currentPath.replace(/edit\/\d+/, "cej");

            router.push(submodule.replace("/cej", ""));
          } else {
            toast.error(
              `No se pudo modificar la ficha ${data || instanceResponse.data || globalAttributeResponse.data || sectionAttributeResponse.data}.`,
            );
          }
        }
      }

      return data;
    }
  };

  return (
    <div className="short-form-layout">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Editar Proceso Judicial</h1>
        <Button
          className="word-btn"
          startContent={<AiOutlineFileWord />}
          onPress={async () => {
            const response = await exportJudicialWord(data?.entityReference);

            const wordResponse = await exportableWord(
              response,
              data?.entityReference,
            );

            if (wordResponse === "ok") {
              toast.success("Proceso descargado.");
            } else {
              toast.success(
                "No se pudo descargar el proceso, intente de nuevo.",
              );
            }
          }}
        >
          Exportar ficha
        </Button>
      </div>

      <BreadcrumbsPath pathname={pathname} />

      <JudicialProcessForm
        handleSubmit={onSubmit}
        judicialProcess={
          data
            ? data
            : {
                entityReference: "",
                coDefendant: "",
                demanded: "",
                fileCode: "",
                plaintiff: "",
              }
        }
        pathname={pathname}
        slug={mappingRevertSubmodules[slug]}
      />
    </div>
  );
}
