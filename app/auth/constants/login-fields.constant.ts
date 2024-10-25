import validateEmail from "@/utils/validate_email";
import { CustomFormField } from "@/components/form/ReusableForm";

export const loginFields: CustomFormField[] = [
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    value: "piero.cusi@estudiorodrigo.com",
    required: true,
    validate: validateEmail,
    messages: {
      required: "Ingrese su correo electrónico.",
      invalid: "Ingrese un correo válido.",
    },
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    value: "admin",
    required: true,
    minLength: 4,
    validate: (value) =>
      value.length < 4 ? "Password must be at least 6 characters" : null,
    messages: {
      required: "Ingrese su contraseña.",
      minLength: "La contraseña debe tener al menos 6 carácteres.",
    },
  },
];
