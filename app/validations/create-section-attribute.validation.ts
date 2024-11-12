import * as Yup from "yup";

const createSectionAttributeSchema = Yup.object().shape({
  label: Yup.string().required("La etiqueta de la opción es obligatoria."),
  slug: Yup.string().required(
    "La propiedad de referencia de la base de datos, es obligatoria.",
  ),
  order: Yup.string().required("El orden es obligatorio."),
  rowLayout: Yup.string().required("El tamaño de grilla es obligatorio."),
});

export default createSectionAttributeSchema;
