import * as Yup from "yup";

const createSectionAttributeOptionSchema = Yup.object().shape({
  optionLabel: Yup.string().required(
    "La etiqueta de la opción es obligatoria.",
  ),
  optionValue: Yup.string().required(
    "El valor de referencia para la base de datos, es obligatoria.",
  ),
});

export default createSectionAttributeOptionSchema;
