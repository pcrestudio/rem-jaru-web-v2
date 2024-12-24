import { FC } from "react";
import useSWR from "swr";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import { GetAttributeRulesDto } from "@/app/dto/attribute-values/get-attribute-rules.dto";
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
        initialValues={attributeRule}
        isOpen={isOpen}
        title={title}
        validationSchema={attributeRuleSchema}
        onCloseChange={onCloseChange}
        onSubmit={(values, reset) => handleSubmit(values, reset)}
      >
        {({ register, errors, touchedFields, control }) => (
          <>
            <div className="grid grid-cols-12 gap-4 px-6">
              <AsyncAutocomplete
                className="col-span-6"
                control={control}
                defaultValue={sectionAttributeId}
                disabled={true}
                errors={errors}
                isRequired={true}
                itemLabel="label"
                itemValue="sectionAttributeId"
                items={data}
                label="Atributo disparador"
                name="triggerAttributeId"
                register={register}
                touched={touchedFields.targetAttributeId}
              />
              <AsyncAutocomplete
                className="col-span-6"
                control={control}
                errors={errors}
                isRequired={true}
                itemLabel="label"
                itemValue="sectionAttributeId"
                items={data.filter(
                  (attribute) =>
                    attribute.sectionAttributeId !== sectionAttributeId,
                )}
                label="Atributo afectado"
                name="targetAttributeId"
                register={register}
                touched={touchedFields.targetAttributeId}
              />
              <ReactiveField
                className="col-span-12"
                control={control}
                errors={errors}
                isRequired={true}
                label="Valor asignado"
                name="targetValue"
                register={register}
                touched={touchedFields.targetValue}
              />
            </div>
          </>
        )}
      </FormDialog>
    </>
  );
};

export default AttributeRulesModal;
