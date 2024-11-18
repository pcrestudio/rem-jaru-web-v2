import ReactiveForm, {
  ReactiveFormProps,
} from "@/components/form/ReactiveForm";
import { FC } from "react";
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
      onSubmit={(values, reset) => onSubmit(values, reset)}
      validationSchema={validationSchema}
      initialValues={initialValues}
      options={{
        mode: "onTouched",
      }}
    >
      {({ register, errors, touchedFields, control, isValid, reset }) => (
        <div className="grid grid-cols-12 gap-4 p-6 lg:min-w-[540px]">
          <LocalAutocomplete
            name="logicalOperator"
            label="Operador lógico"
            options={logicalOperators}
            register={register}
            errors={errors}
            control={control}
            touched={touchedFields.logicalOperator}
            className="col-span-6"
          />
          <LocalAutocomplete
            name="operator"
            label="Operador condicional"
            options={conditionalOperators}
            register={register}
            errors={errors}
            control={control}
            touched={touchedFields.logicalOperator}
            className="col-span-6"
          />
        </div>
      )}
    </ReactiveForm>
  );
};

export default AttributeRulesConditionForm;
