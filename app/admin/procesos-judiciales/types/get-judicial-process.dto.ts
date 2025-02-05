import { GetUserDto } from "@/app/dto/get-user.dto";
import { GetMastersDto } from "@/app/dto/masters/get-masters.dto";
import { GetStepDataDto } from "@/app/dto/instance/get-instance.dto";
import { UpsertReclaimDto } from "@/app/dto/reclaims/upsert-reclaim.dto";
import { GetSectionAttributesValuesDto } from "@/app/dto/attribute-values/get-section-attributes-values.dto";

export interface GetJudicialProcessDto {
  fileCode: string;
  demanded: string;
  plaintiff: string;
  coDefendant: string;
  submoduleId?: number;
  amount?: number;
  responsible?: GetUserDto;
  secondaryResponsible?: GetUserDto;
  project?: GetMastersDto;
  sectionAttributeValues?: GetSectionAttributesValuesDto[];
  studio?: GetMastersDto;
  stepData?: GetStepDataDto[];
  responsibleId?: number;
  secondaryResponsibleId?: number;
  contingencyPercentage?: number;
  contingencyLevel?: number;
  provisionAmount?: number;
  provisionContingency?: number;
  reclaims?: UpsertReclaimDto[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  guaranteeLetter?: string;
  isProvisional?: boolean;
  entityReference?: string;
  comment?: true;
}
