export interface GetInitReportDto {
  matters: {
    report: GetMatterReportDto[];
  };
  provisionAmount: {
    report: number;
  };
  amountSum: {
    report: number;
  };
  internalSpecialists: {
    report: GetMasterOptionReportDto[];
  };
  contingencies: {
    report: GetContingenciesReportDto[];
  };
  causes: {
    report: GetMasterOptionReportDto[];
  };
  criticalProcesses: {
    report: GetMasterOptionReportDto[];
  };
  studio: {
    report: GetStudioReportDto[];
  };
  instances: {
    report: GetInstancesReportDto[];
  };
  total: number;
}

export interface GetMatterReportDto {
  Submodule: GetMasterOptionReportDto[];
}

export interface GetStudioReportDto {
  masterOption: GetMasterOptionReportDto[];
}

export interface GetMasterOptionReportDto {
  name: string;
  _count: {
    judicialProjects?: number;
    JudicialProcess?: number;
    judicialStudios?: number;
    Supervision?: number;
    group?: number;
  };
}

export interface GetInstancesReportDto {
  instanceName: string;
  count: number;
}

export interface GetContingenciesReportDto {
  name: string;
  count: number;
}
