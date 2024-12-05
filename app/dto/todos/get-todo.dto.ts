export interface GetTodoDto {
  id: number;
  check: boolean;
  alert: boolean;
  title: string;
  description: string;
  creatorId: number;
  responsibleId: number;
  createdAt: string;
  updatedAt: string;
  todoStateId: number;
  entityReference: string;
}
