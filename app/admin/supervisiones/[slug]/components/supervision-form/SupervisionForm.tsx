import ReactiveForm from "@/components/form/ReactiveForm";
import { MasterOptionConfig } from "@/config/master-option.config";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import React, { FC } from "react";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import createSupervisionSchema from "@/app/validations/create-supervision.validation";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import { Button } from "@nextui-org/button";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import useSWR from "swr";
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
      onSubmit={handleSubmit}
      validationSchema={createSupervisionSchema}
      initialValues={supervision}
      formId="judicial-process-edit"
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
            isRequired={true}
            name="authorityId"
            label="Autoridad"
            className="col-span-6 nextui-input-nomodal"
            slug={`${MasterOptionConfig.autoridad}-${slugSubmodule}`}
            filter={{
              slugSubmodule: mappingRevertSubmodules[slugSubmodule],
            }}
            control={control}
          />

          <DynamicAutocomplete
            isRequired={true}
            name="situationId"
            label="Situación"
            className="col-span-6 nextui-input-nomodal"
            slug={MasterOptionConfig.situacion}
            control={control}
          />

          <DynamicAutocomplete
            isRequired={true}
            name="projectId"
            label="Proyecto"
            className="col-span-6 nextui-input-nomodal"
            slug={MasterOptionConfig.proyectosGeneral}
            control={control}
          />

          <AsyncAutocomplete
            name="responsibleId"
            isRequired={true}
            control={control}
            register={register}
            errors={errors}
            items={data ?? []}
            className="col-span-6 nextui-input-nomodal"
            label="Responsable"
            itemLabel="firstName"
            itemValue="id"
          />

          {supervision && supervision?.entityReference && (
            <>
              <SectionAttributeFields
                pathname={pathname}
                register={register}
                control={control}
                reset={reset}
                getValues={getValues}
                entityReference={supervision?.entityReference}
              />
              <div className="col-span-12 mt-4">
                <DynamicStepper
                  entityReference={supervision?.entityReference}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="standard-btn bg-red-500 text-white col-span-12 w-fit"
            disabled={!isValid}
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
