import { CustomFormField } from "@/components/form/ReusableForm";

const validateErrorMessages = (
  field: CustomFormField,
  value: string,
): string | undefined | null => {
  if (field?.required && !value.trim()) {
    return field.messages?.required; // Mensaje de error para el campo requerido
  }

  if (field?.minLength && value.length < field.minLength) {
    return field.messages?.minLength; // Mensaje de error para longitud mínima
  }

  if (field?.maxLength && value.length > field.maxLength) {
    return field.messages?.maxLength; // Mensaje de error para longitud máxima
  }

  if (field?.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
    return field?.messages?.invalid;
  }

  return null;
};

export default validateErrorMessages;
