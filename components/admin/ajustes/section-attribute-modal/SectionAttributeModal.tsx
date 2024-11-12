import { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import createSectionAttributeOptionSchema from "@/app/validations/create-section-attribute-option.validation";
import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface SectionAttributeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any, reset: () => void) => void;
  attribute?: GetSectionAttributesDto;
}

const SectionAttributeModal: FC<SectionAttributeModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  attribute,
}) => {
  return (
    <>
      <FormDialog
        isOpen={isOpen}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
        title={title}
        validationSchema={createSectionAttributeOptionSchema}
        initialValues={attribute}
      >
        {({ register, errors, touchedFields, control, reset }) => (
          <>
            <div className="grid grid-cols-12 gap-4 px-6 min-w-[480px]">
              <input
                type="hidden"
                {...register("sectionAttributeOptionId")}
                value={attribute?.sectionAttributeId}
              />
              <ReactiveField
                isRequired={true}
                control={control}
                name="label"
                label="Etiqueta"
                register={register}
                errors={errors}
                touched={touchedFields.label}
                defaultValue={attribute?.label}
                className="col-span-12"
              />
              <ReactiveField
                isRequired={true}
                name="slug"
                control={control}
                label="Propiedad de base de datos"
                register={register}
                errors={errors}
                touched={touchedFields.slug}
                defaultValue={attribute?.slug}
                className="col-span-12"
              />
              <ReactiveField
                isRequired={true}
                name="order"
                control={control}
                label="Orden"
                register={register}
                errors={errors}
                touched={touchedFields.order}
                defaultValue={attribute?.order}
                className="col-span-6"
              />
              <ReactiveField
                isRequired={true}
                name="rowLayout"
                control={control}
                label="Grilla"
                register={register}
                errors={errors}
                touched={touchedFields.rowLayout}
                defaultValue={attribute?.rowLayout}
                className="col-span-6"
              />
            </div>
          </>
        )}
      </FormDialog>
    </>
  );
};

export default SectionAttributeModal;
