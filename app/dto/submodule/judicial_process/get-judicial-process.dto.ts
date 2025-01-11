import { GetUserDto } from "@/app/dto/get-user.dto";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";

export interface GetJudicialProcessDto {
  fileCode: string;
  demanded: string;
  plaintiff: string;
  coDefendant: string;
  submoduleId?: number;
  isProvisional?: boolean;
  guaranteeLetter?: string;
  responsible?: GetUserDto;
  secondaryResponsible?: GetUserDto;
  project?: GetMastersDto;
  studio?: GetMastersDto;
  responsibleId?: number;
  secondaryResponsibleId?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  entityReference?: string;
}
