import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { GetUserDto } from "@/app/dto/get-user.dto";

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
  entityReference?: string;
  project?: GetMasterOptionsDto;
  authority?: GetMasterOptionsDto;
  situation?: GetMasterOptionsDto;
  responsible?: GetUserDto;
}
