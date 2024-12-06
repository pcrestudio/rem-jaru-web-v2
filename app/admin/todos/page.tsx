"use client";

import TodoDataGrid from "@/app/admin/todos/components/todo-datagrid/TodoDataGrid";

export default function Todo() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">To-Dos</h1>
      <TodoDataGrid />
    </div>
  );
}
