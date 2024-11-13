import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface GetSectionAttributesBySlugDto {
  moduleId: number;
  submoduleId: number;
  collapsable: boolean;
  isActive: boolean;
  label: string;
  order: number;
  attributes?: GetSectionAttributesDto[];
}
