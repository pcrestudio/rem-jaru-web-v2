import { GetUserDto } from "@/app/dto/get-user.dto";

export interface GetTodoActivityDto {
  todoId: number;
  activity: string;
  file: string;
  responsibleId: number;
  createdAt?: Date;
  updatedAt?: Date;
  id: number;
  responsible: GetUserDto;
}
