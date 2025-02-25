import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { GetSubmoduleDto } from "@/app/dto/modules/get-submodule.dto";
import { GetInstanceIncidenceDto } from "@/app/dto/instance/get-instance-incidence.dto";

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
  incidences: GetInstanceIncidenceDto[];
}

export interface GetStepDto {
  id: number;
  name: string;
  instanceId: number;
  isGlobal: boolean;
  createdAt: string;
  updatedAt: string;
  stepData: GetStepDataDto[];
  instance: GetInstanceDto;
}

export interface GetStepDataDto {
  comments: string;
  choice?: string;
  resume?: string;
  id?: number;
  stepId?: number;
  entityReference?: string;
  entityId?: string;
  completed?: boolean;
  todos: any;
  file?: string;
  fileTwo?: string;
  fileThree?: string;
  fileFour?: string;
  fileFive?: string;
  step: GetStepDto;
}

export interface GetGroupedStepDto {
  [instanceName: string]: GetInstanceDto[];
}
