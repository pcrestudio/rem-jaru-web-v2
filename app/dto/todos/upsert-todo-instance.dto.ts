export class UpsertTodoDto {
  title: string;
  description: string;
  entityReference?: string;
  entityStepReference?: string;
  todoStateId?: number;
  responsibleId?: number;
  check?: boolean;
  dateExpiration?: object;
  id?: number;
}
