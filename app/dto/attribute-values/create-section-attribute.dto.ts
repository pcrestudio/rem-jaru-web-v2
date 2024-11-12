import { DataType } from "@/app/dto/attribute-values/get-section-attributes.dto";

export interface CreateSectionAttributeDto {
  label: string;
  slug: string;
  isActive: boolean;
  sectionId: number;
  order: number;
  rowLayout: string;
  dataType: DataType;
  moduleId: number;
  submoduleId: number;
  sectionAttributeId?: number;
}
