import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";

export interface GetInstanceDto {
  id: number;
  name: string;
  moduleId: number;
  submoduleId: any;
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
  module: GetModuleDto;
  submodule: GetSubmoduleDto;
  steps: GetStepDto[];
}

export interface GetStepDto {
  id: number;
  name: string;
  instanceId: number;
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
  stepData: GetStepDataDto[];
}

export interface GetStepDataDto {
  comments: string;
  id?: number;
  stepId?: number;
  entityReference?: string;
  entityId?: string;
  completed?: boolean;
  todos: any;
  file?: string;
}
