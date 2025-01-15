import * as Yup from "yup";

const createRoleValidationSchema = Yup.object().shape({
  title: Yup.string().required("El título del rol es obligatorio."),
  name: Yup.string().required("La etiqueta es obligatoria."),
  description: Yup.string().required("La descripción es obligatoria."),
});

export default createRoleValidationSchema;
