import * as Yup from "yup";

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().required("El correo es obligatorio."),
});

export const passswordValidationSchema = Yup.object().shape({
  password: Yup.string().required("La contraseña es obligatoria."),
});

export const otpValidationSchema = Yup.object().shape({
  token: Yup.string().required("El código es obligatorio."),
});

export const passswordResetValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("La contraseña es requerida.")
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula.")
    .matches(/[0-9]/, "Debe contener al menos un número.")
    .matches(/[^a-zA-Z0-9]/, "Debe contener al menos un caracter especial."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir.")
    .required("Por favor confirma tu contraseña."),
});
