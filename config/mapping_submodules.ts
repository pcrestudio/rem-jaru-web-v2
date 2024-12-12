export const mappingSubmodules: Record<string, string> = {
  judicial_process_administrative: "procesos-judiciales-administrativos",
  judicial_process_labor_court: "procesos-judiciales-laborales",
  judicial_process_civil_court: "procesos-judiciales-civiles",
  judicial_process_criminal: "procesos-judiciales-penales",
  supervision_administrative_processes:
    "supervisiones-administrativos-laborales",
  supervision_administrative_sanctioning:
    "supervisiones-administrativos-sancionadores",
};

export const mappingRevertSubmodules: Record<string, string> = {
  "procesos-judiciales-administrativos": "judicial_process_administrative",
  "procesos-judiciales-laborales": "judicial_process_labor_court",
  "procesos-judiciales-civiles": "judicial_process_civil_court",
  "procesos-judiciales-penales": "judicial_process_criminal",
  "supervisiones-administrativos-laborales":
    "supervision_administrative_processes",
  "supervisiones-administrativos-sancionadores":
    "supervision_administrative_sanctioning",
};
