import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";

export interface GetMastersDto {
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  module?: GetModuleDto;
  masterOption?: GetMasterOptionsDto[];
  id?: number;
  isActive?: number;
}

export interface GetGroupedMastersDto {
  [moduleName: string]: GetMastersDto[];
}
