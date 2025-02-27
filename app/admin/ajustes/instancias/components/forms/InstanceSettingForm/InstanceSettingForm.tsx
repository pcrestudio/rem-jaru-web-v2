import React, { FC, useState } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { ModalProps } from "@/app/admin/types/ModalProps";
import { Switch } from "@heroui/switch";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import ReactiveSwitch from "@/components/form/ReactiveSwitch";

interface InstanceSettingFormProps extends ModalProps {}

const InstanceSettingForm: FC<InstanceSettingFormProps> = ({
  isOpen,
  stopEventPropagation,
  title,
  onCloseChange,
  handleSubmit,
}) => {
  const [isSelectedModule, setIsSelectedModule] = useState(false);
  const [isSelectedSubmodule, setIsSelectedSubmodule] = useState(false);
  const { data: modules } = useSWR<any>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );
  const { data: submodules } = useSWR<any>(
    `${environment.baseUrl}/modules/submodules/all`,
    fetcher,
  );

  return (
    <FormDialog
      formId="instance-form"
      initialValues={{
        name: "",
      }}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={null}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, control, getValues, setValue }) => {
        return (
          <div className="grid grid-cols-12 gap-4 px-6">
            <ReactiveField
              className="col-span-12 lg:col-span-12"
              control={control}
              errors={errors}
              register={register}
              label="Nombre de la instancia"
              labelClassName="text-xs"
              name="name"
            />

            <Switch
              className="col-span-12"
              isSelected={isSelectedModule}
              onValueChange={setIsSelectedModule}
            >
              <span className="text-sm">¿Pertenecerá a un módulo?</span>
            </Switch>

            {isSelectedModule && (
              <AsyncAutocomplete
                className="col-span-12 nextui-input"
                control={control}
                errors={errors}
                isRequired={true}
                itemLabel="name"
                itemValue="id"
                items={modules ?? []}
                label="Módulos"
                name="moduleId"
                register={register}
              />
            )}

            <Switch
              className="col-span-12"
              isSelected={isSelectedSubmodule}
              onValueChange={setIsSelectedSubmodule}
            >
              <span className="text-sm">¿Pertenecerá a un submódulo?</span>
            </Switch>

            <ReactiveSwitch
              className="col-span-6"
              control={control}
              label="¿Se usará de manera global?"
              name="isGlobal"
              register={register}
            />

            {isSelectedSubmodule && (
              <AsyncAutocomplete
                className="col-span-12 nextui-input-nomodal"
                control={control}
                errors={errors}
                isRequired={true}
                itemLabel="name"
                itemValue="id"
                items={submodules ?? []}
                label="Submódulos"
                name="submoduleId"
                register={register}
              />
            )}
          </div>
        );
      }}
    </FormDialog>
  );
};

export default InstanceSettingForm;
