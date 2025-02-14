import { GetSectionAttributeOptionDto } from "@/app/dto/attribute-values/get-section-attribute-option.dto";
import { GetSectionAttributesValuesDto } from "@/app/dto/attribute-values/get-section-attributes-values.dto";

export interface GetSectionAttributesDto {
  sectionId: number;
  label: string;
  slug: string;
  isActive: boolean;
  order: number;
  rowLayout: RowLayout;
  submoduleId: number;
  dataType: DataType;
  moduleId: number;
  sectionAttributeId: number;
  globalAttributeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isForReport?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
  conditionalRender?: boolean;
  options?: GetSectionAttributeOptionDto[];
  values?: GetSectionAttributesValuesDto[];
}

export enum DataType {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  DATE = "DATE",
  LIST = "LIST",
  FILE = "FILE",
  EMAIL = "EMAIL",
  BOOLEAN = "BOOLEAN",
}

export enum RowLayout {
  single = "single",
  twoColumns = "twoColumns",
  threeColumns = "threeColumns",
}
