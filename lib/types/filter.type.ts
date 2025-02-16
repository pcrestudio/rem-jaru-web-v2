export type GlobalFilter = {
  queryModule?: string;
  queryPagination?: string;
  queryReport?: string;
  modelType?: string;
  search?: string;
};

export type JudicialProcessFilter = {
  fileCode?: string;
  projectId?: string;
  cargoStudioId?: string;
  responsibleId?: string;
};

export type FilterType = GlobalFilter & JudicialProcessFilter;
