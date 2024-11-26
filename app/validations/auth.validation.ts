import * as Yup from "yup";

const authValidationSchema = Yup.object().shape({
  email: Yup.string().required("El correo es obligatorio."),
  password: Yup.string().required("La contraseña es obligatoria."),
});

export default authValidationSchema;
