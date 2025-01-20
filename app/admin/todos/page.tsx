"use client";

import TodoDataGrid from "@/app/admin/todos/components/todo-datagrid/TodoDataGrid";

export default function Todo() {
  return (
    <div className="page">
      <h1 className="text-2xl font-bold">To-Dos</h1>
      <TodoDataGrid />
    </div>
  );
}
