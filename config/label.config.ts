const criminaLabelDossier: Record<string, string> = {
  plaintiff: "Denunciante",
  demanded: "Denunciado",
  coDefendant: "Tercero civil responsable",
};

const commonLabelDossier: Record<string, string> = {
  plaintiff: "Demandante",
  demanded: "Demandado",
  coDefendant: "Co-demandado",
};

export const labelConfig: Record<string, object> = {
  judicial_process_administrative: {
    ...commonLabelDossier,
  },
  judicial_process_labor_court: {
    ...commonLabelDossier,
  },
  judicial_process_civil_court: {
    ...commonLabelDossier,
  },
  judicial_process_criminal: {
    ...criminaLabelDossier,
  },
  supervision_oefa: {
    ...commonLabelDossier,
  },
  supervision_osinergmin: {
    ...commonLabelDossier,
  },
  supervision_sunafil: {
    ...commonLabelDossier,
  },
  supervision_ana: {
    ...commonLabelDossier,
  },
};
