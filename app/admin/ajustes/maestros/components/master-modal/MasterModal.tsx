"use client";

import React, { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import masterSchema from "@/app/validations/create-master.validation";

export interface MasterModalProps {
  isOpen: boolean;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any) => void;
  master?: GetMastersDto;
}

const MasterModal: FC<MasterModalProps> = ({
  isOpen,
  handleSubmit,
  title,
  onCloseChange,
  master,
}) => {
  return (
    <FormDialog
      isOpen={isOpen}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
      title={title}
      validationSchema={masterSchema}
      initialValues={master}
    >
      {({ register, errors, touchedFields, control, isValid }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          <ReactiveField
            isRequired={true}
            name="name"
            label="Nombre"
            register={register}
            errors={errors}
            touched={touchedFields.name}
            control={control}
            className="col-span-12"
          />
          <ReactiveField
            isRequired={true}
            name="slug"
            label="Slug"
            register={register}
            errors={errors}
            touched={touchedFields.slug}
            control={control}
            className="col-span-12"
          />
        </div>
      )}
    </FormDialog>
  );
};

export default MasterModal;
