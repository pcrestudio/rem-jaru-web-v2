"use client";

import React, { FC, useState } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import masterSchema from "@/app/validations/create-master.validation";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { Switch } from "@nextui-org/switch";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";

export interface MasterModalProps {
  isOpen: boolean;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any) => void;
  master?: GetMastersDto;
  isSettingSection?: boolean;
}

const MasterModal: FC<MasterModalProps> = ({
  isOpen,
  handleSubmit,
  title,
  onCloseChange,
  master,
  isSettingSection,
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

          {isSettingSection && (
            <>
              <Switch
                className="col-span-12"
                isSelected={isSelectedModule}
                onValueChange={setIsSelectedModule}
              >
                ¿Pertenecerá a un módulo?
              </Switch>

              {isSelectedModule && (
                <AsyncAutocomplete
                  name="moduleId"
                  isRequired={true}
                  control={control}
                  register={register}
                  errors={errors}
                  items={modules ?? []}
                  className="col-span-12 nextui-input"
                  label="Módulos"
                  itemLabel="name"
                  itemValue="id"
                />
              )}

              <Switch
                className="col-span-12"
                isSelected={isSelectedSubmodule}
                onValueChange={setIsSelectedSubmodule}
              >
                ¿Pertenecerá a un submódulo?
              </Switch>

              {isSelectedSubmodule && (
                <AsyncAutocomplete
                  name="submoduleId"
                  isRequired={true}
                  control={control}
                  register={register}
                  errors={errors}
                  items={submodules ?? []}
                  className="col-span-12 nextui-input"
                  label="Submódulos"
                  itemLabel="name"
                  itemValue="id"
                />
              )}
            </>
          )}
        </div>
      )}
    </FormDialog>
  );
};

export default MasterModal;
