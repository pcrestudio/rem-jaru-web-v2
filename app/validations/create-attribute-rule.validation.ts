import * as Yup from "yup";
import validateFileCode from "@/utils/validate_file_code";

const attributeRuleSchema = Yup.object().shape({
  triggerAttributeId: Yup.string().required(
    "El atributo disparador es obligatorio.",
  ),
  targetAttributeId: Yup.string().required(
    "El atributo afectado es obligatorio.",
  ),
  targetValue: Yup.string().required("El valor afectado es obligatorio."),
});

export default attributeRuleSchema;
