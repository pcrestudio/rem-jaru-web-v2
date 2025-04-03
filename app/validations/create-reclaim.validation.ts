import * as Yup from "yup";

const createReclaimSchema = Yup.object().shape({
  concept: Yup.string().required("El concepto es requerido."),
  amount: Yup.number().required("El monto."),
  contingencyPercentage: Yup.string().required(
    "El % de contingencia es requerido.",
  ),
  provisionAmount: Yup.number().optional(),
  posibleAmount: Yup.number().required("El monto posible es requerido."),
  remoteAmount: Yup.number().required("El monto remoto es requerido."),
});

export default createReclaimSchema;
