import * as Yup from "yup";

const attributeRuleConditionSchema = Yup.object().shape({
  operator: Yup.string().required("El operador condicional es obligatorio."),
  logicalOperator: Yup.string().required("El operador lógico es obligatorio."),
});

export default attributeRuleConditionSchema;
