import * as Yup from "yup";

const createSupervisionSchema = Yup.object().shape({
  fileCode: Yup.string().required("El código de expediente obligatorio."),
  demanded: Yup.string().required("El demandado es obligatorio."),
  plaintiff: Yup.string().required("El demandante es obligatorio."),
  cargoStudioId: Yup.number().required("El estudio a cargo es obligatorio."),
  projectId: Yup.number().required("El proyecto es obligatorio."),
  controversialMatter: Yup.string().required(
    "La materia controvertida es obligatoria.",
  ),
  amount: Yup.string().required("La cuantia es obligatoria."),
  authorityId: Yup.number().required("La autoridad es obligatoria."),
});

export default createSupervisionSchema;
