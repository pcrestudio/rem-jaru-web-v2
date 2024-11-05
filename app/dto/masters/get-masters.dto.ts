import { GetModuleDto } from "@/app/dto/modules/get-module.dto";

export interface GetMastersDto {
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  module?: GetModuleDto;
  id?: number;
  isActive?: number;
}
