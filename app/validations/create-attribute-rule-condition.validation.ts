import * as Yup from "yup";
import validateFileCode from "@/utils/validate_file_code";

const attributeRuleConditionSchema = Yup.object().shape({
  operator: Yup.string().required("El operador condicional es obligatorio."),
  logicalOperator: Yup.string().required("El operador lógico es obligatorio."),
});

export default attributeRuleConditionSchema;
