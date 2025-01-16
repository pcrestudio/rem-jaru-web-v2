import React, { FC } from "react";
import { Button } from "@nextui-org/button";

import ReactiveForm from "@/components/form/ReactiveForm";
import { MasterOptionConfig } from "@/config/master-option.config";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";
import createSupervisionSchema from "@/app/validations/create-supervision.validation";
import { mappingRevertSubmodules } from "@/config/mapping_submodules";
import SectionAttributeFields from "@/components/shared/section-attribute-fields/SectionAttributeFields";
import DynamicStepper from "@/components/shared/dynamic-stepper/DynamicStepper";
import ResponsibleAutocomplete from "@/components/autocompletes/ResponsibleAutocomplete";
import ProvisionCheck from "@/app/admin/procesos-judiciales/components/ProvisionCheck/ProvisionCheck";
import GlobalAttributeFields from "@/components/shared/global-attribute-fields/GlobalAttributeFields";
import { ModelType } from "@/config/model-type.config";

interface SupervisionFormProps {
  handleSubmit?: (data: any, reset: any, event: any) => void;
  handleStepSubmit?: () => void;
  supervision?: GetSupervisionDto;
  slugSubmodule?: string;
  pathname?: string;
}

const SupervisionForm: FC<SupervisionFormProps> = ({
  supervision,
  slugSubmodule,
  handleSubmit,
  handleStepSubmit,
  pathname,
}) => {
  return (
    <ReactiveForm
      formId="supervision-edit"
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
        watch,
        setValue,
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

          <ResponsibleAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Responsable principal"
            name="responsibleId"
          />

          {supervision && supervision?.entityReference && (
            <>
              <ProvisionCheck
                control={control}
                getValues={getValues}
                pathname={pathname}
                provision={supervision}
                register={register}
                reset={reset}
                setValue={setValue}
                watch={watch}
              />

              <GlobalAttributeFields
                control={control}
                entityReference={supervision?.entityReference}
                getValues={getValues}
                modelType={ModelType.Supervision}
                pathname={pathname}
                register={register}
                reset={reset}
              />

              <SectionAttributeFields
                control={control}
                entityReference={supervision?.entityReference}
                getValues={getValues}
                modelType={ModelType.Supervision}
                pathname={pathname}
                register={register}
                reset={reset}
              />

              <div className="col-span-12 mt-4">
                <DynamicStepper
                  entityReference={supervision?.entityReference}
                  modelType={ModelType.Supervision}
                />
              </div>
            </>
          )}

          <div className="col-span-12 flex flex-row gap-4">
            <Button
              className="standard-btn bg-red-500 text-white w-fit"
              disabled={!isValid}
              type="submit"
            >
              {supervision && supervision.entityReference
                ? "Editar ficha"
                : "Guardar ficha"}
            </Button>

            {supervision && supervision?.entityReference && (
              <Button
                className="word-btn bg-red-500 text-white w-fit"
                type="button"
                onClick={handleStepSubmit}
              >
                Guardar y continuar paso
              </Button>
            )}
          </div>
        </div>
      )}
    </ReactiveForm>
  );
};

export default SupervisionForm;
