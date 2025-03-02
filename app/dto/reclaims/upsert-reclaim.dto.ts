export interface UpsertReclaimDto {
  amount: number;
  concept: string;
  contingencyPercentage: number;
  contingencyLevel: string;
  provisionContingency: number;
  provisionAmount: number;
  remoteAmount?: number;
  posibleAmount?: number;
  reclaimId?: number;
}
