import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";

export interface EditSupervisionDto {
  authorityId: number;
  situationId: number;
  responsibleId: number;
  projectId: number;
  plaintiff: string;
  guaranteeLetter?: string;
  isProvisional: boolean;
  amount?: number;
  provisionAmount?: number;
  provisionContingency?: number;
  id?: number;
  reclaims?: UpsertReclaimDto[];
}
