export class UpsertTodoDto {
  title: string;
  description: string;
  entityReference?: string;
  entityStepReference?: string;
  todoStateId?: number;
  responsibleId?: number;
  dateExpiration?: object;
  id?: number;
}
