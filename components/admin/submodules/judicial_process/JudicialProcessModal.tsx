import React, { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import judicialProcessSchema from "@/app/validations/create-judicial-process.validation";
import { GetJudicialProcessDto } from "@/app/dto/submodule/judicial_process/get-judicial-process.dto";
import CargoStudioAutocomplete from "@/components/shared/master-options-autocompletes/CargoStudioAutocomplete";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import ProjectAutocomplete from "@/components/shared/master-options-autocompletes/ProjectAutocomplete";

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
            errors={errors}
            touched={touchedFields.fileCode}
            className="col-span-12"
          />
          <ReactiveField
            isRequired={true}
            name="demanded"
            label="Demandado"
            register={register}
            errors={errors}
            touched={touchedFields.demanded}
            className="col-span-4"
          />
          <ReactiveField
            isRequired={true}
            name="plaintiff"
            label="Demandante"
            register={register}
            errors={errors}
            touched={touchedFields.plaintiff}
            className="col-span-4"
          />
          <ReactiveField
            name="coDefendant"
            label="Co Demandado"
            register={register}
            errors={errors}
            className="col-span-4"
          />
          <ProjectAutocomplete
            isRequired={true}
            name="projectId"
            label="Proyectos"
            className="col-span-6"
            control={control}
          />
          <CargoStudioAutocomplete
            isRequired={true}
            name="cargoStudioId"
            label="Estudio a cargo"
            className="col-span-6"
            control={control}
          />
        </div>
      )}
    </FormDialog>
  );
};

export default JudicialProcessModal;
