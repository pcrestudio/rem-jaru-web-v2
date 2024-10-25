export interface GetUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
}
