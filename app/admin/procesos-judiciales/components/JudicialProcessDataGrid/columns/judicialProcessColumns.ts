import { DataGridKey } from "@/config/datagrid-key.config";

const judicialProcessColumns = [
  { key: "actions", label: "Opciones" },
  { key: "statusId", label: "Status" },
  {
    key: "responsible",
    label: "Responsable principal",
  },
  {
    key: "secondaryResponsible",
    label: "Responsable secundario",
  },
  {
    key: "project",
    label: "Razón social",
  },
  {
    key: "controversialMatter",
    label: "Moneda",
  },
  {
    key: "paidAmount",
    label: "Monto pagado",
    width: 70,
  },
  {
    key: "savingAmount",
    label: "Monto ahorrado",
    width: 70,
  },
  {
    key: DataGridKey.resultProcess,
    label: "Resultado del proceso",
    width: 70,
  },
  {
    key: DataGridKey.connectLegal,
    label: "Código de Legal Connect",
    width: 70,
  },
  {
    key: DataGridKey.commentsForResult,
    label: "Comentarios sobre el resultado",
    width: 70,
  },
  {
    key: DataGridKey.sede,
    label: "Sede",
    width: 70,
  },
  {
    key: "fileCode",
    label: "Código de Expediente",
    width: 70,
  },
  {
    key: DataGridKey.cause,
    label: "Causa / Raíz",
    width: 70,
  },
  {
    key: DataGridKey.startDate,
    label: "Fecha de inicio del proceso",
    width: 70,
  },
  {
    key: "plaintiff",
    label: "Demandante",
    sortable: true,
  },
  {
    key: "demanded",
    label: "Demandado",
    sortable: true,
  },
  {
    key: "coDefendant",
    label: "Co-Demandado",
    sortable: true,
  },
  {
    key: "amount",
    label: "Cuantía",
    sortable: true,
  },
  {
    key: DataGridKey.resume,
    label: "Breve resumen del caso",
    width: 50,
  },
  {
    key: "instance",
    label: "Instancia actual",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.lastSituation,
    label: "Última actuación",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.nextSituation,
    label: "Próxima acción",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.contingencyPercentage,
    label: "% de contingencia estimado",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.contingencyLevel,
    label: "Nivel de contingencia",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.provisionContingency,
    label: "% de provisión estimado",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.provisionAmount,
    label: "Monto provisionado",
    sortable: true,
    width: 70,
  },
  {
    key: "cargoStudioId",
    label: "Estudio a cargo",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.risks,
    label: "Riesgos",
    sortable: true,
    width: 70,
  },
  {
    key: DataGridKey.criticalProcess,
    label: "Nivel de riesgo",
    sortable: true,
    width: 40,
  },
  {
    key: DataGridKey.principalLawyer,
    label: "Abogado responsable/s",
    sortable: true,
    width: 40,
  },
  {
    key: DataGridKey.lawyerEmail,
    label: "Correo de abogado/s",
    sortable: true,
    width: 40,
  },
  {
    key: DataGridKey.internalSpecialist,
    label: "Especialista interno",
    sortable: true,
    width: 40,
  },
];

export default judicialProcessColumns;
