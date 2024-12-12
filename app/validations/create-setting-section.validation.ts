import * as Yup from "yup";

const createSettingSectionSchema = Yup.object().shape({
  label: Yup.string().required("La etiqueta es obligatoria."),
  order: Yup.string().required("El orden o posición es obligatoria."),
});

export default createSettingSectionSchema;
