export interface UpsertUserDto {
  firstName: string;
  lastName: string;
  email: string;
  authMethod: string;
  displayName: string;
  roleId: number;
  id?: number;
}
