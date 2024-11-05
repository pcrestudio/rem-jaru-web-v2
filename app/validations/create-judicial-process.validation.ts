import * as Yup from "yup";
import validateFileCode from "@/utils/validate_file_code";

const judicialProcessSchema = Yup.object().shape({
  fileCode: Yup.string()
    .required("El código del expediente es obligatorio")
    .test(
      "is-valid-file-code",
      "Ingresar un código de expediente válido. Ejm: 00685-2023-0-2801-JR-LA-01",
      (value) => {
        if (value) {
          return validateFileCode(value) === null;
        }
        return false;
      },
    ),
  demanded: Yup.string().required("El demandado es obligatorio."),
  plaintiff: Yup.string().required("El demandante es obligatorio."),
  cargoStudioId: Yup.string().required("El estudio a cargo es obligatorio."),
});

export default judicialProcessSchema;
