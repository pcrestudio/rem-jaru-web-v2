export const mappingSubmodules: Record<string, string> = {
  judicial_process_administrative: "procesos-judiciales-administrativos",
  judicial_process_labor_court: "procesos-judiciales-laborales",
  judicial_process_civil_court: "procesos-judiciales-civiles",
};

export const mappingRevertSubmodules: Record<string, string> = {
  "procesos-judiciales-administrativos": "judicial_process_administrative",
  "procesos-judiciales-laborales": "judicial_process_labor_court",
  "procesos-judiciales-civiles": "judicial_process_civil_court",
};
