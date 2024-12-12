import * as Yup from "yup";

const createSupervisionSchema = Yup.object().shape({
  authorityId: Yup.number().required("La autoridad es obligatoria."),
});

export default createSupervisionSchema;
