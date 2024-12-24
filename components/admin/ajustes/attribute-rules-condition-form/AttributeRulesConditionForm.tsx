import { FC } from "react";

import ReactiveForm, {
  ReactiveFormProps,
} from "@/components/form/ReactiveForm";
import LocalAutocomplete, {
  LocalAutocompleteOption,
} from "@/components/autocompletes/LocalAutocomplete";

export interface AttributeRulesConditionFormProps extends ReactiveFormProps {}

export enum ConditionalOperator {
  EQUAL = "=",
  NOT_EQUAL = "!=",
  GREATER_THAN = ">",
  GREATER_THAN_EQUAL = ">=",
  LESS_THAN = "<",
  LESS_THAN_EQUAL = "<=",
}

export enum LogicalOperator {
  AND = "&&",
  OR = "||",
  NOT = "!",
}

const logicalOperators: LocalAutocompleteOption[] = [
  {
    label: LogicalOperator.AND,
    value: LogicalOperator.AND,
  },
  {
    label: LogicalOperator.OR,
    value: LogicalOperator.OR,
  },
  {
    label: LogicalOperator.NOT,
    value: LogicalOperator.NOT,
  },
];

const conditionalOperators: LocalAutocompleteOption[] = [
  {
    label: ConditionalOperator.GREATER_THAN,
    value: ConditionalOperator.GREATER_THAN,
  },
  {
    label: ConditionalOperator.LESS_THAN,
    value: ConditionalOperator.LESS_THAN,
  },
];

const AttributeRulesConditionForm: FC<AttributeRulesConditionFormProps> = ({
  onSubmit,
  validationSchema,
  initialValues,
}) => {
  return (
    <ReactiveForm
      initialValues={initialValues}
      options={{
        mode: "onTouched",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, reset) => onSubmit(values, reset)}
    >
      {({ register, errors, touchedFields, control }) => (
        <div className="grid grid-cols-12 gap-4 p-6 lg:min-w-[540px]">
          <LocalAutocomplete
            className="col-span-6"
            control={control}
            errors={errors}
            label="Operador lógico"
            name="logicalOperator"
            options={logicalOperators}
            register={register}
            touched={touchedFields.logicalOperator}
          />
          <LocalAutocomplete
            className="col-span-6"
            control={control}
            errors={errors}
            label="Operador condicional"
            name="operator"
            options={conditionalOperators}
            register={register}
            touched={touchedFields.logicalOperator}
          />
        </div>
      )}
    </ReactiveForm>
  );
};

export default AttributeRulesConditionForm;
