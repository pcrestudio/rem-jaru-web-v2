import { environment } from "@/environment/environment";
import api from "@/config/axios.config";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";

const apiUrl: string = `${environment.baseUrl}/todos`;

export async function upsertTodo(todo: UpsertTodoDto) {
  return api.post(`${apiUrl}/upsert`, todo);
}

export async function alertTodo(todoId: number) {
  return api.patch(`${apiUrl}/alert/${todoId}`);
}
