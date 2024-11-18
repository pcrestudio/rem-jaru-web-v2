export interface CreateAttributeRuleDto {
  targetAttributeId: number;
  triggerAttributeId: number;
  targetValue: string;
  id?: string;
}
