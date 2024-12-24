import React, { FC } from "react";
import { Button } from "@nextui-org/button";
import useSWR from "swr";

import ReactiveForm from "@/components/form/ReactiveForm";
import { MasterOptionConfig } from "@/config/master-option.config";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import createSupervisionSchema from "@/app/validations/create-supervision.validation";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import SectionAttributeFields from "@/components/shared/section-attribute-fields/SectionAttributeFields";
import DynamicStepper from "@/components/shared/dynamic-stepper/DynamicStepper";

interface SupervisionFormProps {
  handleSubmit?: (data: any, reset: any, event: any) => void;
  supervision?: GetSupervisionDto;
  slugSubmodule?: string;
  pathname?: string;
}

const SupervisionForm: FC<SupervisionFormProps> = ({
  supervision,
  slugSubmodule,
  handleSubmit,
  pathname,
}) => {
  const { data } = useSWR<any>(`${environment.baseUrl}/auth/users`, fetcher);

  return (
    <ReactiveForm
      formId="judicial-process-edit"
      initialValues={supervision}
      validationSchema={createSupervisionSchema}
      onSubmit={handleSubmit}
    >
      {({
        register,
        errors,
        touchedFields,
        control,
        isValid,
        reset,
        getValues,
      }) => (
        <div className="grid grid-cols-12 gap-4">
          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            filter={{
              slugSubmodule: mappingRevertSubmodules[slugSubmodule],
            }}
            isRequired={true}
            label="Autoridad"
            name="authorityId"
            slug={`${MasterOptionConfig.autoridad}-${slugSubmodule}`}
          />

          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Situación"
            name="situationId"
            slug={MasterOptionConfig.situacion}
          />

          <DynamicAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Proyecto"
            name="projectId"
            slug={MasterOptionConfig.proyectosGeneral}
          />

          <AsyncAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            itemLabel="firstName"
            itemValue="id"
            items={data ?? []}
            label="Responsable"
            name="responsibleId"
            register={register}
          />

          {supervision && supervision?.entityReference && (
            <>
              <SectionAttributeFields
                control={control}
                entityReference={supervision?.entityReference}
                getValues={getValues}
                pathname={pathname}
                register={register}
                reset={reset}
              />
              <div className="col-span-12 mt-4">
                <DynamicStepper
                  entityReference={supervision?.entityReference}
                />
              </div>
            </>
          )}

          <Button
            className="standard-btn bg-red-500 text-white col-span-12 w-fit"
            disabled={!isValid}
            type="submit"
          >
            {supervision && supervision.entityReference
              ? "Guardar y continuar"
              : "Guardar"}
          </Button>
        </div>
      )}
    </ReactiveForm>
  );
};

export default SupervisionForm;
