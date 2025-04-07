import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import { todoInstanceColumns } from "@/app/admin/todos/components/todo-step-datagrid/columns/todoInstanceColumns";
import TodoModal from "@/app/admin/todos/components/todo-modal-form/TodoModalForm";
import useStore from "@/lib/store";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { upsertTodo } from "@/app/api/todo/todo";
import useTodos from "@/app/admin/todos/states/useTodos";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import BackdropLoading from "@/app/commons/components/BackdropLoading/BackdropLoading";

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
  let { updateStepTodos, updateStepDataArray, updateStepData, stepTodos } =
    useStore();
  const {
    todo,
    handleTodoClose,
    handleAddChange,
    renderCell,
    open,
    handleEndContentChange,
    confirm,
    toggleAlertHelper,
    handleConfirmClose,
  } = useTodos({ isTodoPath: false });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (payload: UpsertTodoDto) => {
    try {
      setLoading(true);

      if (stepDataId) {
        const { data } = await upsertTodo({
          title: payload.title,
          description: payload.description,
          entityStepReference: entityStepReference,
          entityReference: entityReference,
          responsibleId: Number(payload.responsibleId),
          dateExpiration: payload.dateExpiration,
          check: payload.check,
          id: todo ? todo.id : 0,
        });

        if (data) {
          toast.success("Todo agregado con éxito");
          handleTodoClose();
        }
      } else {
        updateStepTodos(payload.title, stepDataId, entityStepReference, {
          title: payload.title,
          description: payload.description,
          dateExpiration: payload.dateExpiration,
          entityReference: entityReference,
          responsibleId: Number(payload.responsibleId),
          id: 0,
        });

        handleTodoClose();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
      <BackdropLoading loading={loading} />

      {createPortal(
        <TodoModal
          endContentOnChange={handleEndContentChange}
          handleSubmit={onSubmit}
          isOpen={open}
          title={todo ? "Editar To-Do" : "Nuevo To-Do"}
          todo={todo}
          onCloseChange={handleTodoClose}
        />,
        document.body,
      )}

      <ConfirmModal
        description={{
          __html: `La alerta será enviada luego de la confirmación, apróximadamente entre 30 segundos a 1 minuto.`,
        }}
        isOpen={confirm}
        title={`Alertar To-Do`}
        onClose={handleConfirmClose}
        onConfirm={() => toggleAlertHelper(todo?.id)}
      />

      <div className="col-span-12 flex flex-col gap-4">
        <p className="text-foreground text-sm">To-Dos</p>

        <CustomDataGrid<GetTodosInstanceDto>
          hasAddButton
          addButtonText="Nuevo To-Do"
          cells={renderCell}
          columns={todoInstanceColumns}
          dataGridKey="id"
          emptyContent="Sin tareas asignadas."
          endpointUrl={`todos/instance?entityReference=${entityReference}&entityStepReference=${entityStepReference}&`}
          storeItems={stepTodos as GetTodosInstanceDto[]}
          totalItemsText="Tareas totales:"
          onAddChange={handleAddChange}
        />
      </div>
    </>
  );
};

export default TodoStepDataGrid;
