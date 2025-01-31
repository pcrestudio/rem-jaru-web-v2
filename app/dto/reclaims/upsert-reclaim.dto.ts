export interface UpsertReclaimDto {
  amount: number;
  contingencyPercentage: number;
  contingencyLevel: string;
  provisionContingency: number;
  provisionAmount: number;
  reclaimId?: number;
}
