import { CustomFormField } from "@/components/form/ReusableFields";
import validateFileCode from "@/utils/validate_file_code";

export const judicialProcessFields: CustomFormField[] = [
  {
    name: "fileCode",
    label: "Código de Expediente",
    type: "text",
    value: "",
    required: true,
    validate: validateFileCode,
    messages: {
      required: "Ingrese el código de expediente.",
      invalid:
        "Ingrese un código de expediente correcto. Ejm: 00685-2023-0-2801-JR-LA-01.",
    },
  },
  {
    name: "demanded",
    label: "Demandado",
    type: "text",
    value: "",
    required: true,
    messages: {
      required: "Ingrese el demandado del expediente.",
    },
  },
  {
    name: "plaintiff",
    label: "Demandante",
    type: "text",
    value: "",
    required: true,
    messages: {
      required: "Ingrese el demandante del expediente.",
    },
  },
  {
    name: "coDefendant",
    label: "Co-Demandado",
    type: "text",
    value: "",
    required: true,
    messages: {
      required: "Ingrese el co-demandante del expediente.",
    },
  },
];
