import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { ModalProps } from "@/app/admin/types/ModalProps";
import PasswordHints from "@/app/auth/components/PasswordHints";

interface UserChangePasswordProps extends ModalProps {}

const UserChangePassword: FC<UserChangePasswordProps> = ({
  isOpen,
  stopEventPropagation,
  title,
  onCloseChange,
  handleSubmit,
}) => {
  return (
    <FormDialog
      formId="reclaims-form"
      initialValues={{}}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={undefined}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, control, watch }) => {
        const passwordValue = watch("password", "");

        return (
          <div className="grid grid-cols-12 gap-4 px-6">
            <ReactiveField
              className="col-span-12 lg:col-span-12"
              control={control}
              errors={errors}
              label="Contraseña"
              labelClassName="text-xs"
              name="password"
              register={register}
              type="password"
            />

            <div className="col-span-12">
              <PasswordHints passwordValue={passwordValue} />
            </div>
          </div>
        );
      }}
    </FormDialog>
  );
};

export default UserChangePassword;
