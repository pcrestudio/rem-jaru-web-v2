import React, { FC } from "react";
import useSWR from "swr";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSectionAttributeOptionDto } from "@/app/dto/attribute-values/get-section-attribute-option.dto";
import SectionAttributeOptionDataGrid from "@/components/admin/ajustes/section-attribute-option-datagrid/SectionAttributeOptionDataGrid";
import createSectionAttributeOptionSchema from "@/app/validations/create-section-attribute-option.validation";

export interface SectionAttributeOptionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCloseChange: () => void;
  title: string;
  selectedConfigureOption: (
    attributeOption: GetSectionAttributeOptionDto,
  ) => void;
  handleSubmit?: (data: any, reset: () => void) => void;
  attributeId?: number;
  optionType?: string;
  attributeOption?: GetSectionAttributeOptionDto;
}

const SectionAttributeOptionModal: FC<SectionAttributeOptionModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  attributeId,
  selectedConfigureOption,
  attributeOption,
  optionType,
}) => {
  const { data } = useSWR<GetSectionAttributeOptionDto[]>(
    `${environment.baseUrl}/extended/options?attributeId=${attributeId}`,
    fetcher,
  );

  return (
    <>
      <FormDialog
        buttonSubmitTitle={
          attributeOption.attributeId ? "Actualizar" : "Guardar"
        }
        initialValues={attributeOption}
        isOpen={isOpen}
        title={title}
        validationSchema={createSectionAttributeOptionSchema}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
      >
        {({ register, errors, touchedFields, control }) => {
          return (
            <>
              <div className="grid grid-cols-12 gap-4 px-6 min-w-[480px]">
                <input
                  type="hidden"
                  {...register(`${optionType}AttributeId`, {
                    value: attributeId,
                  })}
                  defaultValue={attributeId}
                />

                <input
                  type="hidden"
                  {...register("sectionAttributeOptionId")}
                  value={attributeOption?.sectionAttributeOptionId}
                />
                <ReactiveField
                  className="col-span-12"
                  control={control}
                  defaultValue={attributeOption?.optionLabel}
                  errors={errors}
                  isRequired={true}
                  label="Etiqueta"
                  name="optionLabel"
                  register={register}
                  touched={touchedFields.optionLabel}
                />
                <ReactiveField
                  className="col-span-12"
                  control={control}
                  defaultValue={attributeOption?.optionValue}
                  errors={errors}
                  isRequired={true}
                  label="Propiedad de base de datos"
                  name="optionValue"
                  register={register}
                  touched={touchedFields.optionValue}
                />
                {attributeId !== null && (
                  <div className="col-span-12">
                    <SectionAttributeOptionDataGrid
                      attributeOptions={data}
                      selectedItem={selectedConfigureOption}
                    />
                  </div>
                )}
              </div>
            </>
          );
        }}
      </FormDialog>
    </>
  );
};

export default SectionAttributeOptionModal;
