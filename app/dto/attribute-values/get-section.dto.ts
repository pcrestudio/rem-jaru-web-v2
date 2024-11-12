import { GetSectionAttributesDto } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface GetSectionDto {
  sectionId: number;
  label: string;
  order: number;
  collapsable: boolean;
  isActive: boolean;
  moduleId: number;
  submoduleId: number;
  attributes?: GetSectionAttributesDto[];
}
