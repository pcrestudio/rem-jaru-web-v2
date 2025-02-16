import * as Yup from "yup";

const judicialProcessSchema = Yup.object().shape({
  fileCode: Yup.string().required("El código de expediente obligatorio."),
  demanded: Yup.string().required("El demandado es obligatorio."),
  projectId: Yup.number().required("El proyecto es obligatorio."),
  controversialMatter: Yup.string().required(
    "La materia controvertida es obligatorial.",
  ),
});

export default judicialProcessSchema;
