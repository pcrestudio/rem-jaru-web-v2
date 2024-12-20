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
    key: "isActive",
    label: "Activo",
  },
  { key: "actions", label: "Opciones" },
];

export default judicialProcessColumns;
