import { CustomFormField } from "@/components/form/ReusableFields";

const validateErrorMessages = (
  field: CustomFormField,
  value: string,
): string | undefined | null => {
  if (field?.required && !value.trim()) {
    return field.messages?.required;
  }

  if (field?.minLength && value.length < field.minLength) {
    return field.messages?.minLength;
  }

  if (field?.maxLength && value.length > field.maxLength) {
    return field.messages?.maxLength;
  }

  if (field?.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
    return field?.messages?.invalid;
  }

  if (
    field?.name === "fileCode" &&
    !/^\d{5}-\d{4}-0-\d+-[A-Z]+-[A-Z]+-\d{2}$/.test(value)
  ) {
    return field?.messages?.invalid;
  }

  return null;
};

export default validateErrorMessages;
