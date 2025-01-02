import * as Yup from "yup";

const masterOptionSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
});

export default masterOptionSchema;
