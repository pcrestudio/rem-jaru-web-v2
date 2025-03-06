import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { ModalProps } from "@/app/admin/types/ModalProps";
import { UpsertIncidenceDto } from "@/app/dto/incidences/upsert-incidence.dto";

interface IncidencesFormProps extends ModalProps {
  incidence: UpsertIncidenceDto;
}

const IncidencesForm: FC<IncidencesFormProps> = ({
  incidence,
  isOpen,
  stopEventPropagation,
  title,
  onCloseChange,
  handleSubmit,
}) => {
  return (
    <FormDialog
      formId="incidence-form"
      initialValues={incidence || {}}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={undefined}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, control }) => {
        return (
          <div className="grid grid-cols-12 gap-4 px-6">
            <ReactiveField
              className="col-span-12 lg:col-span-12"
              control={control}
              errors={errors}
              label="Nombre"
              labelClassName="text-xs"
              name="title"
              register={register}
            />
          </div>
        );
      }}
    </FormDialog>
  );
};

export default IncidencesForm;
