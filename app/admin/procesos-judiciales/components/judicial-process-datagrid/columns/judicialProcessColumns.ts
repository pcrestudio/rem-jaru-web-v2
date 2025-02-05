const judicialProcessColumns = [
  {
    key: "fileCode",
    label: "Código de Expediente",
  },
  {
    key: "demanded",
    label: "Demandante",
    sortable: true,
  },
  {
    key: "plaintiff",
    label: "Demandado",
    sortable: true,
  },
  {
    key: "coDefendant",
    label: "Co-Demandado",
    sortable: true,
  },
  {
    key: "responsibleId",
    label: "Responsable",
    sortable: true,
    width: 70,
  },
  {
    key: "secondaryResponsibleId",
    label: "Responsable Secundario",
    sortable: true,
    width: 70,
  },
  {
    key: "projectId",
    label: "Proyecto",
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
    key: "instance",
    label: "Instancia",
    sortable: true,
    width: 70,
  },
  { key: "actions", label: "Opciones" },
];

export default judicialProcessColumns;
