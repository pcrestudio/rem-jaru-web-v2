import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";

export interface EditJudicialProcessDto {
  fileCode: string;
  demanded: string;
  plaintiff: string;
  coDefendant: string;
  id: number;
  cargoStudioId: number;
  isProvisional: boolean;
  comment?: string;
  reclaims?: UpsertReclaimDto[];
}
