import React, { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";

export interface JudicialProcessModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any) => void;
  judicialProcess?: GetJudicialProcessDto;
}

const JudicialProcessModal: FC<JudicialProcessModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  judicialProcess,
}) => {
  return (
    <FormDialog
      isOpen={isOpen}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
      title={title}
      validationSchema={judicialProcessSchema}
      initialValues={judicialProcess}
    >
      {({ register, errors, touchedFields, control, isValid }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          <ReactiveField
            isRequired={true}
            name="fileCode"
            label="Código de Expediente"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.fileCode}
            className="col-span-12"
          />
          <ReactiveField
            isRequired={true}
            name="demanded"
            label="Demandado"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.demanded}
            className="col-span-4"
          />
          <ReactiveField
            isRequired={true}
            name="plaintiff"
            label="Demandante"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.plaintiff}
            className="col-span-4"
          />
          <ReactiveField
            name="coDefendant"
            label="Co Demandado"
            register={register}
            control={control}
            errors={errors}
            className="col-span-4"
          />
          <DynamicAutocomplete
            isRequired={true}
            name="projectId"
            label="Proyectos"
            className="col-span-6"
            slug={MasterOptionConfig.proyectos}
            control={control}
          />
          <DynamicAutocomplete
            isRequired={true}
            name="cargoStudioId"
            label="Estudio a cargo"
            className="col-span-6"
            slug={MasterOptionConfig.estudios}
            control={control}
          />
          <DynamicAutocomplete
            isRequired={true}
            name="controversialMatter"
            label="Materia controvertida"
            className="col-span-12"
            optionValue="name"
            slug={MasterOptionConfig.materia}
            control={control}
          />
        </div>
      )}
    </FormDialog>
  );
};

export default JudicialProcessModal;
