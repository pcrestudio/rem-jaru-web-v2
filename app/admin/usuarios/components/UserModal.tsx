import React, { FC } from "react";
import useSWR from "swr";

import { ModalProps } from "@/app/admin/types/ModalProps";
import { GetUserDto } from "@/app/dto/get-user.dto";
import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import createUserValidationSchema from "@/app/validations/create-user.validation";
import LocalAutocomplete, {
  LocalAutocompleteOption,
} from "@/components/autocompletes/LocalAutocomplete";
import { AuthMethod } from "@/app/admin/usuarios/types/authMethod.enum";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetRoleDto } from "@/app/dto/role/get-role.dto";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import { MasterOptionConfig } from "@/config/master-option.config";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";

interface UserModalProps extends ModalProps {
  user?: GetUserDto;
}

const authMethods: LocalAutocompleteOption[] = [
  {
    label: "OTP",
    value: AuthMethod.otp,
  },
  {
    label: "Local",
    value: AuthMethod.local,
  },
  {
    label: "Azure SSO",
    value: AuthMethod.azure,
  },
];

const UserModal: FC<UserModalProps> = ({
  user,
  isOpen,
  title,
  stopEventPropagation,
  onCloseChange,
  handleSubmit,
}) => {
  const { data } = useSWR<GetRoleDto[]>(
    `${environment.baseUrl}/roles`,
    fetcher,
  );

  return (
    <FormDialog
      formId="user-form"
      initialValues={user}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createUserValidationSchema}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, touchedFields, control }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Nombres"
            name="firstName"
            register={register}
            touched={touchedFields.firstName}
          />

          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Apellidos"
            name="lastName"
            register={register}
            touched={touchedFields.lastName}
          />

          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Correo electrónico"
            name="email"
            register={register}
            touched={touchedFields.email}
          />

          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Nombre a mostrar"
            name="displayName"
            register={register}
            touched={touchedFields.displayName}
          />

          <LocalAutocomplete
            className="col-span-12 nextui-input-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            label="Tipo de autenticación"
            name="authMethod"
            options={authMethods}
            register={register}
            touched={touchedFields.authMethods}
          />

          <AsyncAutocomplete
            className="col-span-12 nextui-input-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            itemLabel="title"
            itemValue="id"
            items={data ?? []}
            label="Roles"
            name="roleId"
          />

          <DynamicAutocomplete
            className="col-span-12 nextui-input-nomodal"
            control={control}
            label="Estudio a cargo"
            name="studioId"
            slug={MasterOptionConfig.estudios}
          />
        </div>
      )}
    </FormDialog>
  );
};

export default UserModal;
