import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface GetSectionAttributesValuesDto {
  value: string;
  createdAt?: string;
  modifiedAt?: string;
  createdBy?: string;
  entityReference?: number;
  modifiedBy?: string;
  sectionAttributeId?: number;
  sectionAttributeValueId?: number;
  attribute?: GetSectionAttributesDto;
}
