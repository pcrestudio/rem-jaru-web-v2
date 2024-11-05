import { CustomFormField } from "@/components/form/ReusableFields";
import validateFileCode from "@/utils/validate_file_code";

export const masterOptionFields: CustomFormField[] = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    value: "",
    required: true,
    validate: validateFileCode,
    messages: {
      required: "Ingrese algún nombre a su maestro opción.",
    },
  },
];
