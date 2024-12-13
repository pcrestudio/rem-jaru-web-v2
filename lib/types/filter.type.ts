export type GlobalFilter = {
  search: string;
};

export type JudicialProcessFilter = {
  fileCode?: string;
  projectId?: string;
  cargoStudioId?: string;
  responsibleId?: string;
};

export type FilterType = GlobalFilter & JudicialProcessFilter;
