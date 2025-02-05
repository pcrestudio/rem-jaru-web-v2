export interface EditJudicialProcessDto {
  fileCode: string;
  demanded: string;
  plaintiff: string;
  coDefendant: string;
  id: number;
  cargoStudioId: number;
  isProvisional: boolean;
  comment?: string;
}
