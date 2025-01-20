"use client";

import { usePathname } from "next/navigation";
import useSWR from "swr";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";
import { AiOutlineFileWord } from "react-icons/ai";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import SupervisionForm from "@/app/admin/supervisiones/[slug]/components/supervision-form/SupervisionForm";
import getSectionAttributesSlug from "@/utils/get_section_attributes_slug";
import getGlobalAttributesSlug from "@/utils/get_global_attributes_slug";
import { exportJudicialWord } from "@/app/api/judicial-process/judicial-process";
import { upsertInstanceStepData } from "@/app/api/instances/instances";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";
import {
  createGlobalAttributeValue,
  createSectionAttributeValue,
} from "@/app/api/attribute-values/atrribute-values";
import useStore from "@/lib/store";
import exportableWord from "@/utils/exportable_word";
import { EditSupervisionDto } from "@/app/dto/supervision/edit-supervision.dto";
import {
  editSupervision,
  exportSupervisionWord,
} from "@/app/api/supervision/supervision";
import { ModelType } from "@/config/model-type.config";

export default function SupervisionesSlugEdit() {
  const pathname = usePathname();
  const slug: string = pathname.split("/")[3];
  const id: string = pathname.split("/")[5];

  const { data } = useSWR<GetSupervisionDto>(
    `${environment.baseUrl}/supervisions/${id}`,
    fetcher,
  );

  const { stepDataArray, stepData } = useStore();

  const handleSubmit = async (
    payload: EditSupervisionDto,
    _: any,
    event: any,
  ) => {
    if (event.target.id === "supervision-edit") {
      const customFields = getSectionAttributesSlug(payload);
      const globalFields = getGlobalAttributesSlug(payload);

      const { data } = await editSupervision(
        {
          ...payload,
          id: Number(id),
        },
        slug,
      );

      if (data) {
        if (globalFields.length > 0) {
          const response = await createGlobalAttributeValue({
            attributes: globalFields,
            entityReference: data?.entityReference,
            modelType: ModelType.Supervision,
          });

          if (response.data) {
            toast.success("Atributos planos modificado con éxito");
          }
        } else {
          toast.success("Atributos planos con éxito");
        }

        if (customFields.length > 0) {
          const response = await createSectionAttributeValue({
            attributes: customFields,
            entityReference: data?.entityReference,
            modelType: ModelType.Supervision,
          });

          if (response.data) {
            toast.success("Atributos extendidos modificado con éxito");
          }
        } else {
          toast.success("Atributos extendidos modificado con éxito");
        }
      }

      return data;
    }
  };

  const handleStepSubmit = async () => {
    if (stepDataArray.length > 0) {
      const instanceResponse = await upsertInstanceStepData({
        stepData: stepDataArray as InstanceStepDataDto[],
        modelType: ModelType.Supervision,
      });

      if (instanceResponse.data) {
        toast.success("Instancias guardada con éxito");
      }
    }
  };

  return (
    <div className="short-form-layout">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Editar Supervisión</h1>
        <Button
          className="word-btn"
          startContent={<AiOutlineFileWord />}
          onClick={async () => {
            const response = await exportSupervisionWord();

            exportableWord(response, data?.entityReference);
          }}  
        >
          Exportar ficha
        </Button>
      </div>

      <BreadcrumbsPath pathname={pathname} />

      <SupervisionForm
        handleStepSubmit={handleStepSubmit}
        handleSubmit={handleSubmit}
        pathname={pathname}
        slugSubmodule={slug}
        supervision={
          data ?? {
            projectId: 0,
            responsibleId: 0,
            authorityId: 0,
            situationId: 0,
          }
        }
      />
    </div>
  );
}
