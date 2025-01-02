import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";

export interface GetTodoDto {
  id: number;
  check: boolean;
  alert: boolean;
  title: string;
  description: string;
  creatorId: number;
  responsibleId: number;
  createdAt: string;
  updatedAt: string;
  todoStateId: number;
  entityReference: string;
  entityStepReference?: string;
  dateExpiration?: string;
  detail?: GetTodoDetailDto;
  state?: GetMasterOptionsDto;
  responsible?: GetUserDto;
}

export interface GetTodoDetailDto {
  submodule?: GetTodoSubmoduleDto;
}

export interface GetTodoSubmoduleDto extends GetSubmoduleDto {
  module?: GetModuleDto;
}
