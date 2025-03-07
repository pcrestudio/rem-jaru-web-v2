import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { ModalProps } from "@/app/admin/types/ModalProps";
import { GetUserDto } from "@/app/dto/get-user.dto";

interface UserChangePasswordProps extends ModalProps {
  user: GetUserDto;
}

const UserChangePassword: FC<UserChangePasswordProps> = ({
  user,
  isOpen,
  stopEventPropagation,
  title,
  onCloseChange,
  handleSubmit,
}) => {
  return (
    <FormDialog
      formId="reclaims-form"
      initialValues={user || {}}
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
              label="Concepto"
              labelClassName="text-xs"
              name="password"
              register={register}
              type="password"
            />
          </div>
        );
      }}
    </FormDialog>
  );
};

export default UserChangePassword;
