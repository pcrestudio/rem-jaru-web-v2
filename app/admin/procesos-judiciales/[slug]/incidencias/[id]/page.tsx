"use client";

import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";

import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import ReactiveForm from "@/components/form/ReactiveForm";
import ReactiveField from "@/components/form/ReactiveField";
import ReactiveTextArea from "@/components/form/ReactiveTextArea";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { upsertIncidenceDataDto } from "@/app/api/incidences/incidences";
import { UpsertIncidentDataDto } from "@/app/dto/instance/upsert-incident-data.dto";
import IncidenceInstances from "@/app/commons/components/IncidencesInstances/IncidencesInstances";
import { upsertInstanceStepData } from "@/app/api/instances/instances";
import { InstanceStepDataDto } from "@/app/dto/instance/create-instance-stepdata.dto";
import useStore from "@/lib/store";
import { ModelType } from "@/config/model-type.config";

export default function IncidenciasProcesosJudiciales() {
  const pathname = usePathname();
  const param: string = pathname.split("/")[5];
  const slug: string = pathname.split("/")[3];
  const incidenceId: number = Number(param.split("-")[0]);
  const fileCode: string = param.split("-")[1];
  const { data } = useSWR<any>(
    `${environment.baseUrl}/incident/data?incidenceId=${incidenceId}`,
    fetcher,
  );
  const { stepDataArray } = useStore();

  const handleSubmit = async (payload: UpsertIncidentDataDto) => {
    const { data } = await upsertIncidenceDataDto({
      ...payload,
      instanceIncidentId: incidenceId,
    });

    const instanceResponse = await upsertInstanceStepData({
      stepData: stepDataArray as InstanceStepDataDto[],
      modelType: ModelType.JudicialProcess,
      isInstance: true,
      incidenceId: incidenceId,
    });

    if (data) {
      if (instanceResponse.data) {
        toast.success("Instancias modificadas con éxito");
      }

      toast.success("Los datos de la incidencia fueron creados.");
    } else {
      toast.error("Oops. Pasó algo.");
    }
  };

  return (
    <>
      <BreadcrumbsPath pathname={pathname} />

      <ReactiveForm
        formId="incidence-data-edit"
        initialValues={data ? data : { fileCode }}
        options={{
          mode: "onTouched",
        }}
        validationSchema={null}
        onSubmit={handleSubmit}
      >
        {({ register, errors, touchedFields, control, isValid }) => (
          <div className="grid grid-cols-12 gap-4">
            <ReactiveField
              className="col-span-12 md:col-span-6"
              control={control}
              errors={errors}
              label="Juzgado"
              name="headquarters"
              register={register}
              touched={touchedFields.headquarters}
            />

            <ReactiveField
              readOnly
              className="col-span-12 md:col-span-6"
              control={control}
              errors={errors}
              label="Código de expediente"
              name="fileCode"
              register={register}
              touched={touchedFields.fileCode}
            />

            <ReactiveTextArea
              className="col-span-12 nextui-textarea-nomodal"
              control={control}
              errors={errors}
              label="Comentarios"
              name="comment"
              register={register}
              touched={touchedFields.comment}
            />

            <div className="col-span-12">
              <IncidenceInstances
                entityReference={fileCode}
                incidenceId={incidenceId}
              />
            </div>

            <Button
              className="standard-btn bg-red-500 text-white w-fit"
              isDisabled={!isValid}
              type="submit"
            >
              {data ? "Editar incidencia" : "Guardar incidencia"}
            </Button>
          </div>
        )}
      </ReactiveForm>
    </>
  );
}
