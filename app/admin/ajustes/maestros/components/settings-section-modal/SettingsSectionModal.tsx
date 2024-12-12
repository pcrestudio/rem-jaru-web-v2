import { ModalProps } from "@/app/admin/types/ModalProps";
import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";
import React, { FC, useState } from "react";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import ReactiveField from "@/components/form/ReactiveField";
import { Switch } from "@nextui-org/switch";
import createSettingSectionSchema from "@/app/validations/create-setting-section.validation";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";

interface AttributeSectionModalProps extends ModalProps {
  attributeSection?: GetSectionAttributesDto;
}

const SettingsSectionModal: FC<AttributeSectionModalProps> = ({
  attributeSection,
  stopEventPropagation,
  title,
  handleSubmit,
  onCloseChange,
  isOpen,
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
      formId="settings-section-form"
      stopEventPropagation={stopEventPropagation}
      isOpen={isOpen}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
      title={title}
      validationSchema={createSettingSectionSchema}
      initialValues={attributeSection}
    >
      {({ register, errors, touchedFields, control, isValid }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          <ReactiveField
            isRequired={true}
            name="label"
            label="Etiqueta"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.label}
            className="col-span-6"
          />

          <ReactiveField
            isRequired={true}
            name="order"
            control={control}
            label="Orden"
            register={register}
            errors={errors}
            touched={touchedFields.order}
            className="col-span-6"
          />

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
        </div>
      )}
    </FormDialog>
  );
};

export default SettingsSectionModal;
