export interface UpsertReclaimsDto {
  amount: number;
  contingencyPercentage: number;
  contingencyLevel: string;
  provisionContingency: number;
  provisionAmount: number;
  concept: string;
}
