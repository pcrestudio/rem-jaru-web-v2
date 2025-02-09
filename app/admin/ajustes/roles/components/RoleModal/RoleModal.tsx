import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { GetRoleDto } from "@/app/dto/role/get-role.dto";
import { ModalProps } from "@/app/admin/types/ModalProps";
import createRoleValidationSchema from "@/app/validations/create-role.validation";
import ReactiveTextArea from "@/components/form/ReactiveTextArea";

interface RoleModalProps extends ModalProps {
  role?: GetRoleDto;
}

const RoleModal: FC<RoleModalProps> = ({
  role,
  isOpen,
  stopEventPropagation,
  handleSubmit,
  title,
  onCloseChange,
}) => {
  return (
    <FormDialog
      formId="todo-form"
      initialValues={role ?? {}}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createRoleValidationSchema}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, touchedFields, control }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          <ReactiveField
            className="col-span-12"
            control={control}
            errors={errors}
            isRequired={true}
            label="Nombre"
            name="title"
            register={register}
            touched={touchedFields.title}
          />

          <ReactiveTextArea
            className="col-span-12 nextui-textarea-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            label="Descripción"
            name="description"
            register={register}
            touched={touchedFields.description}
          />

          <ReactiveField
            className="col-span-12"
            control={control}
            errors={errors}
            isRequired={true}
            label="Etiqueta del rol"
            name="name"
            register={register}
            touched={touchedFields.name}
          />
        </div>
      )}
    </FormDialog>
  );
};

export default RoleModal;
