import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";

export interface GetSupervisionDto {
  projectId: number;
  responsibleId: number;
  authorityId: number;
  situationId: number;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  submoduleId?: number;
  project?: GetMasterOptionsDto;
  authority?: GetMasterOptionsDto;
  situation?: GetMasterOptionsDto;
  secondaryResponsible?: GetUserDto;
  stepData?: GetStepDataDto[];
  amount?: number;
  studio?: GetMastersDto;
  responsible?: GetUserDto;
  guaranteeLetter?: string;
  isProvisional?: boolean;
  entityReference?: string;
  comment?: true;
}
