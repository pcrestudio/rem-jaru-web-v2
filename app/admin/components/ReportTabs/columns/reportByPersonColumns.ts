import { MasterReportTabs } from "@/config/master-report-tabs.config";

const reportByPersonColumns = (type: string) => [
  {
    key: "name",
    label: type === MasterReportTabs.byPlaintiff ? "Demandante" : "Demandado",
    width: 350,
  },
  {
    key: "count",
    label: "Fichas asignadas",
  },
];

export default reportByPersonColumns;
