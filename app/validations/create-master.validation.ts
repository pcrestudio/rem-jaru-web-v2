import * as Yup from "yup";

const masterSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  slug: Yup.string().required("La etiqueta es obligatoria"),
});

export default masterSchema;
