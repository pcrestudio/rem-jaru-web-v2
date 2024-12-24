"use client";

import React, { FC, useState } from "react";
import useSWR from "swr";
import { Switch } from "@nextui-org/switch";

import ReactiveField from "@/components/form/ReactiveField";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import masterSchema from "@/app/validations/create-master.validation";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
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
      initialValues={master}
      isOpen={isOpen}
      title={title}
      validationSchema={masterSchema}
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
            name="name"
            register={register}
            touched={touchedFields.name}
          />
          <ReactiveField
            className="col-span-12"
            control={control}
            errors={errors}
            isRequired={true}
            label="Slug"
            name="slug"
            register={register}
            touched={touchedFields.slug}
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
                ¿Pertenecerá a un submódulo?
              </Switch>

              {isSelectedSubmodule && (
                <AsyncAutocomplete
                  className="col-span-12 nextui-input"
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
            </>
          )}
        </div>
      )}
    </FormDialog>
  );
};

export default MasterModal;
