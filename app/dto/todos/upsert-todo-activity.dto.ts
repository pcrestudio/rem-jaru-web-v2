export interface UpsertTodoActivityDto {
  todoId: number;
  activity: string;
  file: string;
  responsibleId: number;
  id?: number;
}
