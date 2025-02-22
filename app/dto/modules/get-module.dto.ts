export interface GetModuleDto {
  name: string;
  order: number;
  slug: string;
  isActive?: boolean;
  id?: number;
}

export interface GetGroupedModuleDto {
  [moduleName: string]: GetModuleDto;
}
