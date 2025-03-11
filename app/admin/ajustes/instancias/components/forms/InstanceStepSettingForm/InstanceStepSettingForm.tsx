import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { ModalProps } from "@/app/admin/types/ModalProps";
import { GetStepDto } from "@/app/dto/instance/get-instance.dto";

interface ReclaimsModalFormProps extends ModalProps {
  instanceStep: GetStepDto;
}

const InstanceStepSettingForm: FC<ReclaimsModalFormProps> = ({
  instanceStep,
  isOpen,
  stopEventPropagation,
  title,
  onCloseChange,
  handleSubmit,
}) => {
  return (
    <FormDialog
      formId="instance-step-form"
      initialValues={instanceStep || {}}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={null}
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
              label="Nombre del paso"
              labelClassName="text-xs"
              name="name"
              register={register}
            />
          </div>
        );
      }}
    </FormDialog>
  );
};

export default InstanceStepSettingForm;
