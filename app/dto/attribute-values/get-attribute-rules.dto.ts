import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface GetAttributeRulesDto {
  triggerAttributeId: number;
  targetAttributeId: number;
  targetValue: string;
  triggerAttribute: GetSectionAttributesDto;
  targetAttribute: GetSectionAttributesDto;
  id?: string;
}
