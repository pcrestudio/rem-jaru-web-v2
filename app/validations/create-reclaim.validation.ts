import * as Yup from "yup";

const createReclaimSchema = Yup.object().shape({
  concept: Yup.string().required("El concepto es requerido."),
  amount: Yup.number().required("El monto."),
});

export default createReclaimSchema;
