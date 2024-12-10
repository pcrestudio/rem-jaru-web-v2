import { GetRoleDto } from "@/app/dto/role/get-role.dto";

export interface GetUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  UserRole?: GetUserRoleDto[];
}

export interface GetUserRoleDto {
  userId: number;
  roleId: number;
  role?: GetRoleDto;
  createdAt?: Date;
  updatedAt?: Date;
}
