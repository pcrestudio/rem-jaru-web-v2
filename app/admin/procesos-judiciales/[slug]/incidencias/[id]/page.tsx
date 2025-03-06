"use client";

import { usePathname } from "next/navigation";

import React from "react";
import BreadcrumbsPath from "@/components/breadcrumbs/BreadcrumbsPath";
import ReactiveForm from "@/components/form/ReactiveForm";
import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import ReactiveField from "@/components/form/ReactiveField";
import ReactiveTextArea from "@/components/form/ReactiveTextArea";

export default function IncidenciasProcesosJudiciales() {
  const pathname = usePathname();
  const param: string = pathname.split("/")[5];
  const slug: string = pathname.split("/")[3];
  const instanceId: number = Number(param.split("-")[0]);
  const fileCode: string = param.split("-")[1];

  console.log(slug);

  const handleSubmit = (payload: any) => {
    console.log(payload);
  };

  return (
    <>
      <BreadcrumbsPath pathname={pathname} />

      <ReactiveForm
        formId="judicial-process-edit"
        initialValues={{
          fileCode,
        }}
        options={{
          mode: "onTouched",
        }}
        validationSchema={judicialProcessSchema}
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
          </div>
        )}
      </ReactiveForm>
    </>
  );
}
