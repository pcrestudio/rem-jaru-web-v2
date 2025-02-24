import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";
import { GetSectionAttributesValuesDto } from "@/app/dto/attribute-values/get-section-attributes-values.dto";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";

export interface GetSupervisionDto {
  projectId: number;
  responsibleId: number;
  contingencyPercentage?: number;
  contingencyLevel?: number;
  provisionAmount?: any;
  provisionContingency?: any;
  sectionAttributeValues?: GetSectionAttributesValuesDto[];
  reclaims?: UpsertReclaimDto[];
  status?: GetMastersDto;
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
