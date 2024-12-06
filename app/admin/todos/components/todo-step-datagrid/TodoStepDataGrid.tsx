import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import React, { FC, useEffect, useState } from "react";
import { todoInstanceColumns } from "@/app/admin/todos/components/todo-step-datagrid/columns/todoInstanceColumns";
import TodoModal from "@/app/admin/todos/components/todo-modal-form/TodoModalForm";
import { createPortal } from "react-dom";
import useStore from "@/lib/store";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { upsertTodo } from "@/app/api/todo/todo";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import toast from "react-hot-toast";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";

interface TodoStepDataGridProps {
  stepDataId: number;
  stepId: number;
  entityReference?: string;
}

const TodoStepDataGrid: FC<TodoStepDataGridProps> = ({
  entityReference,
  stepDataId,
  stepId,
}) => {
  const { data } = useSWR<GetTodosInstanceDto[]>(
    `${environment.baseUrl}/todos/instance?entityReference=${entityReference}`,
    fetcher,
  );
  const [todo, setTodo] = useState<GetTodoDto>(null);
  let { updateStepTodos, updateStepDataArray, updateStepData, stepTodos } =
    useStore();

  const [open, setOpen] = useState<boolean>(false);

  const selectTodo = (todo: GetTodoDto) => {
    setTodo(todo);
    setOpen(true);
  };

  const renderCell = React.useCallback(
    (item: GetTodoDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
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
    if (stepDataId) {
      const { data } = await upsertTodo({
        title: payload.title,
        description: payload.description,
        entityReference: entityReference,
        todoStateId: Number(payload.todoStateId),
        responsibleId: Number(payload.responsibleId),
        id: todo ? todo.id : 0,
      });

      if (data) {
        toast.success("Todo agregado con éxito");
        return setOpen(false);
      }
    } else {
      updateStepTodos(payload.title, stepDataId, entityReference, {
        title: payload.title,
        description: payload.description,
        todoStateId: Number(payload.todoStateId),
        responsibleId: Number(payload.responsibleId),
        id: 0,
      });

      return setOpen(false);
    }
  };

  useEffect(() => {
    if (stepTodos && stepTodos.length > 0) {
      updateStepData(stepId, { todos: stepTodos });
      updateStepDataArray(stepId, { todos: stepTodos });
    }
  }, [stepTodos]);

  return (
    <>
      {createPortal(
        <TodoModal
          stepDataId={stepDataId}
          isOpen={open}
          handleSubmit={onSubmit}
          onCloseChange={() => setOpen(false)}
          title="Todo"
          todo={todo}
        />,
        document.body,
      )}

      <div className="col-span-12 flex flex-col gap-4">
        <p className="text-foreground text-sm">To-Dos</p>

        <CustomDataGrid<GetTodosInstanceDto>
          columns={todoInstanceColumns}
          dataGridKey="id"
          items={
            data && data.length > 0
              ? data
              : (stepTodos as GetTodosInstanceDto[])
          }
          cells={renderCell}
          emptyContent="Sin tareas por completar."
          onAddChange={() => setOpen(true)}
          hasAddButton
          addButtonText="Nuevo To-Do"
        />
      </div>
    </>
  );
};

export default TodoStepDataGrid;
