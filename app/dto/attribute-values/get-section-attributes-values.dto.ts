import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface GetSectionAttributesValuesDto {
  value: string;
  createdAt?: string;
  createdBy?: string;
  entityReference?: number;
  modifiedBy?: string;
  modifiedAt?: Date;
  sectionAttributeId?: number;
  sectionAttributeValueId?: number;
  attribute?: GetSectionAttributesDto;
}
