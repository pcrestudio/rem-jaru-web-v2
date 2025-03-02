import React, { FC } from "react";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";
import createSectionAttributeSchema from "@/app/validations/create-section-attribute.validation";
import LocalAutocomplete from "@/components/autocompletes/LocalAutocomplete";
import {
  options,
  rowLayoutOptions,
} from "@/config/attribute_local_autocompletes";
import ReactiveSwitch from "@/components/form/ReactiveSwitch";

export interface SectionAttributeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any, reset: () => void) => void;
  attribute?: GetSectionAttributesDto;
  sectionId?: number;
}

const SectionAttributeModal: FC<SectionAttributeModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  attribute,
  sectionId,
}) => {
  return (
    <>
      <FormDialog
        initialValues={attribute}
        isOpen={isOpen}
        title={title}
        validationSchema={createSectionAttributeSchema}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
      >
        {({ register, errors, touchedFields, control }) => (
          <>
            <div className="grid grid-cols-12 gap-4 px-6 min-w-[480px]">
              {attribute && (
                <input
                  type="hidden"
                  {...register("sectionAttributeId")}
                  value={attribute?.sectionAttributeId}
                />
              )}

              <input
                type="hidden"
                {...register("sectionId")}
                value={sectionId}
              />

              <ReactiveField
                className="col-span-12"
                control={control}
                errors={errors}
                isRequired={true}
                label="Etiqueta"
                name="label"
                register={register}
                touched={touchedFields.label}
              />

              <ReactiveField
                className="col-span-12"
                control={control}
                errors={errors}
                isRequired={true}
                label="Propiedad de base de datos"
                name="slug"
                register={register}
                touched={touchedFields.slug}
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
              />

              <LocalAutocomplete
                className="col-span-6 nextui-input-nomodal"
                control={control}
                errors={errors}
                isRequired={true}
                label="Grilla"
                name="rowLayout"
                options={rowLayoutOptions}
                register={register}
              />

              <LocalAutocomplete
                className="col-span-12 nextui-input-nomodal"
                control={control}
                errors={errors}
                isRequired={true}
                label="Tipo de dato"
                name="dataType"
                options={options}
                register={register}
              />

              <ReactiveSwitch
                className="col-span-12"
                control={control}
                isSelected={attribute?.isForReport ?? false}
                label="¿Es para reportes?"
                name="isForReport"
                register={register}
              />

              <ReactiveSwitch
                className="col-span-12"
                control={control}
                isSelected={attribute?.isMultiple ?? false}
                label="¿Es de selección múltiple?"
                name="isMultiple"
                register={register}
              />

              <ReactiveSwitch
                className="col-span-12"
                control={control}
                isSelected={attribute?.isRequired ?? false}
                label="¿Es obligatorio?"
                name="isRequired"
                register={register}
              />
            </div>
          </>
        )}
      </FormDialog>
    </>
  );
};

export default SectionAttributeModal;
