import React, { FC, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import toast from "react-hot-toast";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import TodoModal from "@/app/admin/todos/components/todo-modal-form/TodoModalForm";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { upsertTodo } from "@/app/api/todo/todo";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import { todoColumns } from "@/app/admin/todos/components/todo-datagrid/columns/todoColumns";

interface TodoDataGridProps {}

const TodoDataGrid: FC<TodoDataGridProps> = () => {
  const [todo, setTodo] = useState<GetTodoDto>(null);
  const [open, setOpen] = useState<boolean>(false);

  const selectTodo = (todo: GetTodoDto) => {
    setTodo(todo);
    setOpen(true);
  };

  const renderCell = React.useCallback(
    (item: GetTodoDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "module":
          return item.detail.submodule.module.name;

        case "submodule":
          return item.detail.submodule.name;

        case "responsible":
          return `${item.responsible.firstName} ${item.responsible.lastName}`;

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar todo">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => selectTodo(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  const onSubmit = async (payload: UpsertTodoDto) => {
    const { data } = await upsertTodo({
      title: payload.title,
      description: payload.description,
      entityReference: todo.entityReference,
      entityStepReference: todo.entityStepReference,
      todoStateId: Number(payload.todoStateId),
      responsibleId: Number(payload.responsibleId),
      id: todo ? todo.id : 0,
    });

    if (data) {
      toast.success("Todo modificado con éxito");

      return setOpen(false);
    }
  };

  return (
    <>
      <TodoModal
        handleSubmit={onSubmit}
        isOpen={open}
        title="Todo"
        todo={todo}
        onCloseChange={() => setOpen(false)}
      />

      <CustomDataGrid<GetTodosInstanceDto>
        cells={renderCell}
        columns={todoColumns}
        dataGridKey="id"
        emptyContent="Sin tareas por completar."
        endpointUrl="todos?"
        onAddChange={() => setOpen(true)}
      />
    </>
  );
};

export default TodoDataGrid;
