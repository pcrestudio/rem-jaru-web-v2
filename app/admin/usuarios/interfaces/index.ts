import {GetUserDto} from "@/app/dto/get-user.dto";

export interface IUser extends GetUserDto {
  id: number;
  role: string;
}
