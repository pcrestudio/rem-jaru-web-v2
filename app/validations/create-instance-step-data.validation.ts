import * as Yup from "yup";

const createInstanceStepDataValidation = Yup.object({
  file: Yup.string().required("Adjunto es obligatorio"),
  comments: Yup.string().required("Comentario es obligatorio"),
});

export default createInstanceStepDataValidation;
