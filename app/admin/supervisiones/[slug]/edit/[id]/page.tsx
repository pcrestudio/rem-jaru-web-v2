"use client";

import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@heroui/button";
import { AiOutlineFileWord } from "react-icons/ai";

import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import SupervisionForm from "@/app/admin/supervisiones/[slug]/components/supervision-form/SupervisionForm";
import getSectionAttributesSlug from "@/utils/get_section_attributes_slug";
import getGlobalAttributesSlug from "@/utils/get_global_attributes_slug";
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
import BackdropLoading from "@/app/commons/components/BackdropLoading/BackdropLoading";

export default function SupervisionesSlugEdit() {
  const pathname = usePathname();
  const slug: string = pathname.split("/")[3];
  const id: string = pathname.split("/")[5];
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useSWR<GetSupervisionDto>(
    `${environment.baseUrl}/supervisions/${id}`,
    fetcher,
  );

  const { stepDataArray } = useStore();

  const handleSubmit = async (
    payload: EditSupervisionDto,
    _: any,
    event: any,
  ) => {
    if (event.target.id === "supervision-edit") {
      try {
        const customFields = getSectionAttributesSlug(payload);
        const globalFields = getGlobalAttributesSlug(payload);

        setLoading(true);

        const { data } = await editSupervision(
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
              modelType: ModelType.Supervision,
            });

            const instanceResponse = await upsertInstanceStepData({
              stepData: stepDataArray as InstanceStepDataDto[],
              modelType: ModelType.Supervision,
            });

            const sectionAttributeResponse = await createSectionAttributeValue({
              attributes: customFields,
              entityReference: data?.entityReference,
              modelType: ModelType.Supervision,
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
              toast.error(`No se pudo modificar la ficha ${data}.`);
            }
          }
        }

        return data;
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <BackdropLoading loading={loading} />

      <div className="short-form-layout">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Editar Supervisión</h1>
          <Button
            className="word-btn"
            startContent={<AiOutlineFileWord />}
            onPress={async () => {
              const response = await exportSupervisionWord(
                data?.entityReference,
              );

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

        <SupervisionForm
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
    </>
  );
}
