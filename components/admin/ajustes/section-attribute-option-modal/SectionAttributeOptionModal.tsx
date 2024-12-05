import React, { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import useSWR from "swr";
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
  sectionAttributeId?: number;
  attributeOption?: GetSectionAttributeOptionDto;
}

const SectionAttributeOptionModal: FC<SectionAttributeOptionModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  sectionAttributeId,
  selectedConfigureOption,
  attributeOption,
}) => {
  const { data } = useSWR<GetSectionAttributeOptionDto[]>(
    `${environment.baseUrl}/extended/options?attributeId=${sectionAttributeId}`,
    fetcher,
  );

  return (
    <>
      <FormDialog
        isOpen={isOpen}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
        title={title}
        validationSchema={createSectionAttributeOptionSchema}
        initialValues={attributeOption}
        buttonSubmitTitle={
          attributeOption.attributeId ? "Actualizar" : "Guardar"
        }
      >
        {({ register, errors, touchedFields, control, reset }) => {
          return (
            <>
              <div className="grid grid-cols-12 gap-4 px-6 min-w-[480px]">
                <input
                  type="hidden"
                  {...register("attributeId", { value: sectionAttributeId })}
                  defaultValue={sectionAttributeId}
                />
                <input
                  type="hidden"
                  {...register("sectionAttributeOptionId")}
                  value={attributeOption?.sectionAttributeOptionId}
                />
                <ReactiveField
                  isRequired={true}
                  control={control}
                  name="optionLabel"
                  label="Etiqueta"
                  register={register}
                  errors={errors}
                  touched={touchedFields.optionLabel}
                  defaultValue={attributeOption?.optionLabel}
                  className="col-span-12"
                />
                <ReactiveField
                  isRequired={true}
                  name="optionValue"
                  control={control}
                  label="Propiedad de base de datos"
                  register={register}
                  errors={errors}
                  touched={touchedFields.optionValue}
                  defaultValue={attributeOption?.optionValue}
                  className="col-span-12"
                />
                {sectionAttributeId !== null && (
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
