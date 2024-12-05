export class UpsertTodoDto {
  title: string;
  description: string;
  entityReference?: string;
  todoStateId?: number;
  responsibleId?: number;
  id?: number;
}
