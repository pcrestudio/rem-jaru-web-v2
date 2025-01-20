import { environment } from "@/environment/environment";
import api from "@/config/axios.config";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { UpsertTodoActivityDto } from "@/app/dto/todos/upsert-todo-activity.dto";

const apiUrl: string = `${environment.baseUrl}/todos`;

export async function upsertTodo(todo: UpsertTodoDto) {
  return api.post(`${apiUrl}/upsert`, todo);
}

export async function alertTodo(todoId: number) {
  return api.patch(`${apiUrl}/alert/${todoId}`);
}

export async function deleteTodo(todoId: number) {
  return api.delete(`${apiUrl}/delete/${todoId}`);
}

export async function deleteActivity(todoActivityId: number) {
  return api.delete(`${apiUrl}/activity?todoActivityId=${todoActivityId}`);
}

export async function upsertTodoActivity(todoActivity: UpsertTodoActivityDto) {
  const formData = new FormData();

  Object.entries(todoActivity).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object" && !(value instanceof File)) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });

  return api.post(`${apiUrl}/upsert/activity`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
