import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import toast from "react-hot-toast";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import { todoInstanceColumns } from "@/app/admin/todos/components/todo-step-datagrid/columns/todoInstanceColumns";
import TodoModal from "@/app/admin/todos/components/todo-modal-form/TodoModalForm";
import useStore from "@/lib/store";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { upsertTodo } from "@/app/api/todo/todo";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";

interface TodoStepDataGridProps {
  stepDataId: number;
  stepId: number;
  entityReference?: string;
  entityStepReference?: string;
}

const TodoStepDataGrid: FC<TodoStepDataGridProps> = ({
  entityReference,
  entityStepReference,
  stepDataId,
  stepId,
}) => {
  const [todo, setTodo] = useState<GetTodoDto>(null);
  let { updateStepTodos, updateStepDataArray, updateStepData, stepTodos } =
    useStore();

  const [open, setOpen] = useState<boolean>(false);

  const selectTodo = (todo: GetTodoDto) => {
    setTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTodo(null);
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
        entityStepReference: entityStepReference,
        entityReference: entityReference,
        todoStateId: Number(payload.todoStateId),
        responsibleId: Number(payload.responsibleId),
        dateExpiration: payload.dateExpiration,
        id: todo ? todo.id : 0,
      });

      if (data) {
        toast.success("Todo agregado con éxito");

        return setOpen(false);
      }
    } else {
      updateStepTodos(payload.title, stepDataId, entityStepReference, {
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
          handleSubmit={onSubmit}
          isOpen={open}
          title="Todo"
          todo={todo}
          onCloseChange={handleClose}
        />,
        document.body,
      )}

      <div className="col-span-12 flex flex-col gap-4">
        <p className="text-foreground text-sm">To-Dos</p>

        <CustomDataGrid<GetTodosInstanceDto>
          hasAddButton
          addButtonText="Nuevo To-Do"
          cells={renderCell}
          columns={todoInstanceColumns}
          dataGridKey="id"
          emptyContent="Sin tareas por completar."
          endpointUrl={`todos/instance?entityReference=${entityReference}&`}
          storeItems={stepTodos as GetTodosInstanceDto[]}
          totalItemsText="Tareas totales:"
          onAddChange={() => setOpen(true)}
        />
      </div>
    </>
  );
};

export default TodoStepDataGrid;
