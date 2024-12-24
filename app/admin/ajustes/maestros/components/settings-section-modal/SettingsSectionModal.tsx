import React, { FC, useState } from "react";
import { Switch } from "@nextui-org/switch";
import useSWR from "swr";

import { ModalProps } from "@/app/admin/types/ModalProps";
import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import ReactiveField from "@/components/form/ReactiveField";
import createSettingSectionSchema from "@/app/validations/create-setting-section.validation";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import ReactiveSwitch from "@/components/form/ReactiveSwitch";
import LocalAutocomplete from "@/components/autocompletes/LocalAutocomplete";
import {
  options,
  rowLayoutOptions,
} from "@/config/attribute_local_autocompletes";

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
  const [isSection, setIsSection] = useState(true);
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
      initialValues={attributeSection}
      isOpen={isOpen}
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createSettingSectionSchema}
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
            label="Etiqueta"
            name="label"
            register={register}
            touched={touchedFields.label}
          />

          <ReactiveField
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            label="Orden"
            name="order"
            register={register}
            touched={touchedFields.order}
            type="number"
          />

          {!isSection && (
            <>
              <ReactiveField
                className="col-span-6"
                control={control}
                errors={errors}
                isRequired={true}
                label="Propiedad de base de datos"
                name="slug"
                register={register}
                touched={touchedFields.slug}
              />
              <LocalAutocomplete
                className="col-span-6"
                control={control}
                errors={errors}
                isRequired={true}
                label="Grilla"
                name="rowLayout"
                options={rowLayoutOptions}
                register={register}
              />
              <LocalAutocomplete
                className="col-span-12"
                control={control}
                errors={errors}
                isRequired={true}
                label="Tipo de dato"
                name="dataType"
                options={options}
                register={register}
              />
            </>
          )}

          <ReactiveSwitch
            control={control}
            defaultValue={isSection}
            isSelected={isSection}
            label="¿Es una sección?"
            name="withoutSection"
            register={register}
            onValueChange={setIsSection}
          />

          {isSection && (
            <ReactiveSwitch
              control={control}
              label="¿Es una sección colapsable?"
              name="collapsable"
              register={register}
            />
          )}

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
        </div>
      )}
    </FormDialog>
  );
};

export default SettingsSectionModal;
