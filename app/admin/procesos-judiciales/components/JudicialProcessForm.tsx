import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import ReactiveField from "@/components/form/ReactiveField";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import SectionAttributeFields from "@/components/shared/section-attribute-fields/SectionAttributeFields";
import ReactiveForm from "@/components/form/ReactiveForm";
import React, { FC } from "react";
import { Button } from "@nextui-org/button";

interface JudicialProcessFormProps {
  handleSubmit?: (data: any) => void;
  initialValues?: any;
  pathname?: string;
}

const JudicialProcessForm: FC<JudicialProcessFormProps> = ({
  initialValues,
  pathname,
  handleSubmit,
}) => {
  return (
    <ReactiveForm
      onSubmit={handleSubmit}
      validationSchema={judicialProcessSchema}
      initialValues={initialValues}
    >
      {({ register, errors, touchedFields, control, isValid }) => (
        <div className="grid grid-cols-12 gap-4">
          <ReactiveField
            isRequired={true}
            name="fileCode"
            label="Código de Expediente"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.fileCode}
            className="col-span-12 nextui-input-nomodal"
          />
          <ReactiveField
            isRequired={true}
            name="demanded"
            label="Demandado"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.demanded}
            className="col-span-4 nextui-input-nomodal"
          />
          <ReactiveField
            isRequired={true}
            name="plaintiff"
            label="Demandante"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.plaintiff}
            className="col-span-4 nextui-input-nomodal"
          />
          <ReactiveField
            name="coDefendant"
            label="Co Demandado"
            register={register}
            control={control}
            errors={errors}
            className="col-span-4 nextui-input-nomodal"
          />
          <DynamicAutocomplete
            isRequired={true}
            name="projectId"
            label="Proyectos"
            className="col-span-6 nextui-input-nomodal"
            slug={MasterOptionConfig.proyectos}
            control={control}
          />
          <DynamicAutocomplete
            isRequired={true}
            name="cargoStudioId"
            label="Estudio a cargo"
            className="col-span-6 nextui-input-nomodal"
            slug={MasterOptionConfig.estudios}
            control={control}
          />
          <DynamicAutocomplete
            isRequired={true}
            name="controversialMatter"
            label="Materia controvertida"
            className="col-span-12 nextui-input-nomodal"
            optionValue="name"
            slug={MasterOptionConfig.materia}
            control={control}
          />
          <SectionAttributeFields
            pathname={pathname}
            register={register}
            control={control}
            entityReference={initialValues?.entityReference}
          />
          <Button
            type="submit"
            className="standard-btn text-white col-span-12 w-fit"
            disabled={!isValid}
          >
            Guardar
          </Button>
        </div>
      )}
    </ReactiveForm>
  );
};

export default JudicialProcessForm;
