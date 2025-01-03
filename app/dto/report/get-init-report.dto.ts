export interface GetInitReportDto {
  matters: {
    report: GetMatterReportDto[];
  };
  provisionAmount: {
    report: number;
  };
  contingencies: {
    report: GetMasterOptionReportDto[];
  };
  criticalProcesses: {
    report: GetMasterOptionReportDto[];
  };
  studio: {
    report: GetStudioReportDto[];
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
    group?: number;
  };
}
