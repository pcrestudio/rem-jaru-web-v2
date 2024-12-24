import * as Yup from "yup";

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
