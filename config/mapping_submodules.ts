export const mappingModuleEN: Record<string, string> = {
  "Procesos Judiciales": "JudicialProcess",
  Supervisiones: "Supervision",
};

export const mappingSubmodules: Record<string, string> = {
  judicial_process_administrative: "procesos-judiciales-administrativos",
  judicial_process_labor_court: "procesos-judiciales-laborales",
  judicial_process_civil_court: "procesos-judiciales-civiles",
  judicial_process_criminal: "procesos-judiciales-penales",
  supervision_oefa: "supervisiones-oefa",
  supervision_osinergmin: "supervisiones-osinergmin",
  supervision_sunafil: "supervisiones-sunafil",
  supervision_ana: "supervisiones-ana",
};

export const routeOptionMapping: Record<string, string> = {
  "/admin/procesos-judiciales": "/admin/modulos",
  "/admin/supervisiones": "/admin/modulos",
};

export const mappingRevertSubmodules: Record<string, string> = {
  "procesos-judiciales-administrativos": "judicial_process_administrative",
  "procesos-judiciales-laborales": "judicial_process_labor_court",
  "procesos-judiciales-civiles": "judicial_process_civil_court",
  "procesos-judiciales-penales": "judicial_process_criminal",
  "supervisiones-oefa": "supervision_oefa",
  "supervisiones-osinergmin": "supervision_osinergmin",
  "supervisiones-sunafil": "supervision_sunafil",
  "supervisiones-ana": "supervision_ana",
};

export const mappingNamePath: Record<string, string> = {
  "procesos-judiciales": "Procesos Judiciales",
  "procesos-judiciales-administrativos": "Administrativos",
  "procesos-judiciales-laborales": "Laborales",
  "procesos-judiciales-penales": "Penales",
  "procesos-judiciales-civiles": "Civiles",
  "supervisiones-oefa": "OEFA",
  "supervisiones-osinergmin": "OSINERGMIN",
  "supervisiones-sunafil": "SUNAFIL",
  "supervisiones-ana": "ANA",
  cej: "CEJ",
  create: "Nuevo",
  edit: "Editar",
  ajustes: "Ajustes",
  personalizar: "Personalizar",
  reglas: "Reglas",
};
