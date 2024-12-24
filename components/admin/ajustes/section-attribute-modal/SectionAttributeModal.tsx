import { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import {
  DataType,
  GetSectionAttributesDto,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";
import createSectionAttributeSchema from "@/app/validations/create-section-attribute.validation";
import LocalAutocomplete, {
  LocalAutocompleteOption,
} from "@/components/autocompletes/LocalAutocomplete";
import {
  options,
  rowLayoutOptions,
} from "@/config/attribute_local_autocompletes";

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
        isOpen={isOpen}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
        title={title}
        validationSchema={createSectionAttributeSchema}
        initialValues={attribute}
      >
        {({ register, errors, touchedFields, control, reset }) => (
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
                isRequired={true}
                control={control}
                name="label"
                label="Etiqueta"
                register={register}
                errors={errors}
                touched={touchedFields.label}
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
                className="col-span-6"
              />
              <LocalAutocomplete
                isRequired={true}
                name="rowLayout"
                label="Grilla"
                options={rowLayoutOptions}
                register={register}
                errors={errors}
                control={control}
                className="col-span-6"
              />
              <LocalAutocomplete
                isRequired={true}
                name="dataType"
                label="Tipo de dato"
                options={options}
                register={register}
                errors={errors}
                control={control}
                className="col-span-12"
              />
            </div>
          </>
        )}
      </FormDialog>
    </>
  );
};

export default SectionAttributeModal;
