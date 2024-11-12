export interface GetSectionAttributesDto {
  sectionId: number;
  label: string;
  slug: string;
  isActive: boolean;
  order: number;
  rowLayout: string;
  submoduleId: number;
  dataType: DataType;
  moduleId: number;
  sectionAttributeId: number;
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
