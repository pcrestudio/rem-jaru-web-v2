import { GetRoleDto } from "@/app/dto/role/get-role.dto";
import { GetMasterOptionsDto } from "@/app/dto/masters/get-master-options.dto";

export interface GetUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  authMethod?: string;
  isLocked?: boolean;
  displayName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  UserRole?: GetUserRoleDto[];
  studio?: GetMasterOptionsDto;
  studioId?: number;
  roleId?: number;
}

export interface GetUserRoleDto {
  userId: number;
  roleId: number;
  role?: GetRoleDto;
  createdAt?: Date;
  updatedAt?: Date;
}
