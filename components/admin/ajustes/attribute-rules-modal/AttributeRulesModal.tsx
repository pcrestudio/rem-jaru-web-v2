import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { GetAttributeRulesDto } from "@/app/dto/attribute-values/get-attribute-rules.dto";
import { FC } from "react";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import attributeRuleSchema from "@/app/validations/create-attribute-rule.validation";

export interface AttributeRulesModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any, reset: () => void) => void;
  attributeRule?: GetAttributeRulesDto;
  moduleId?: number;
  sectionAttributeId?: number;
}

const AttributeRulesModal: FC<AttributeRulesModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  attributeRule,
  moduleId,
  sectionAttributeId,
}) => {
  const { data } = useSWR<GetSectionAttributesDto[]>(
    `${environment.baseUrl}/extended/attributes/module?moduleId=${moduleId}`,
    fetcher,
  );

  return (
    <>
      <FormDialog
        isOpen={isOpen}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
        title={title}
        validationSchema={attributeRuleSchema}
        initialValues={attributeRule}
      >
        {({ register, errors, touchedFields, control, reset }) => (
          <>
            <div className="grid grid-cols-12 gap-4 px-6">
              <AsyncAutocomplete
                isRequired={true}
                control={control}
                name="triggerAttributeId"
                label="Atributo disparador"
                register={register}
                errors={errors}
                touched={touchedFields.targetAttributeId}
                defaultValue={sectionAttributeId}
                items={data}
                itemLabel="label"
                itemValue="sectionAttributeId"
                className="col-span-6"
                disabled={true}
              />
              <AsyncAutocomplete
                isRequired={true}
                control={control}
                name="targetAttributeId"
                label="Atributo afectado"
                register={register}
                errors={errors}
                touched={touchedFields.targetAttributeId}
                items={data.filter(
                  (attribute) =>
                    attribute.sectionAttributeId !== sectionAttributeId,
                )}
                itemLabel="label"
                itemValue="sectionAttributeId"
                className="col-span-6"
              />
              <ReactiveField
                isRequired={true}
                control={control}
                name="targetValue"
                label="Valor asignado"
                register={register}
                errors={errors}
                touched={touchedFields.targetValue}
                className="col-span-12"
              />
            </div>
          </>
        )}
      </FormDialog>
    </>
  );
};

export default AttributeRulesModal;
