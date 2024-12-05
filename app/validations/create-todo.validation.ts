import * as Yup from "yup";

const createTodoValidationSchema = Yup.object().shape({
  title: Yup.string().required("El título de la tarea es obligatoria."),
  description: Yup.string().required("La descripción es obligatoria."),
  responsibleId: Yup.number().required("El responsable es obligatorio."),
});

export default createTodoValidationSchema;
