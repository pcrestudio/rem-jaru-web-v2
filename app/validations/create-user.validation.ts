import * as Yup from "yup";

const createUserValidationSchema = Yup.object().shape({
  email: Yup.string().required("El correo es obligatorio."),
  firstName: Yup.string().required("El nombre es obligatorio."),
  lastName: Yup.string().required("El apellido es obligatorio."),
  displayName: Yup.string().required(
    "El nombre para mostrar debe ser obligatorio.",
  ),
  authMethod: Yup.string().required(
    "Debe seleccionar un tipo de autenticación.",
  ),
});

export default createUserValidationSchema;
