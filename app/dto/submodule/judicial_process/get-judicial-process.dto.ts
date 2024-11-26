export interface GetJudicialProcessDto {
  fileCode: string;
  demanded: string;
  plaintiff: string;
  coDefendant: string;
  submoduleId?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  entityReference?: string;
}
