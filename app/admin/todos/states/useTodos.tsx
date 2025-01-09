import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import toast from "react-hot-toast";
import { HiOutlineBellAlert } from "react-icons/hi2";

import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import format_date from "@/utils/format_date";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { alertTodo, upsertTodo } from "@/app/api/todo/todo";
import TodoSemaphore from "@/app/admin/todos/components/todo-semaphore/TodoSemaphore";

interface UseTodosProps {
  todo: GetTodoDto;
  open: boolean;
  confirm: boolean;
  handleTodoClose: () => void;
  handleConfirmClose: () => void;
  handleAddChange: () => void;
  handleEndContentChange: () => void;
  toggleAlertHelper: (todoId: number) => Promise<void>;
  renderCell: any;
  onSubmit: (payload: UpsertTodoDto) => void;
}

const useTodos = (): UseTodosProps => {
  const [todo, setTodo] = useState<GetTodoDto>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const handleTodoClose = () => {
    setOpen(false);
    setTodo(null);
  };

  const handleAddChange = () => {
    setOpen(true);
  };

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

        case "dateExpiration":
          return item.dateExpiration
            ? `${format_date(new Date(item.dateExpiration))}`
            : "Sin fecha de vencimiento.";

        case "state":
          return (
            <Tooltip content={item.state.name}>
              <TodoSemaphore slug={item.state.slug} />
            </Tooltip>
          );

        case "alert":
          return item.alert ? <HiOutlineBellAlert size={20} /> : "-";

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
      dateExpiration: payload.dateExpiration,
      id: todo ? todo.id : 0,
    });

    if (data) {
      toast.success("Todo modificado con éxito");

      return setOpen(false);
    }
  };

  const handleEndContentChange = () => {
    setConfirm(true);
    setOpen(false);
  };

  const handleConfirmClose = () => {
    setConfirm(false);
    setOpen(true);
  };

  const toggleAlertHelper = async (todoId: number) => {
    const { data } = await alertTodo(todoId);

    if (data) {
      toast.success("El todo ha sido alertado.");
      setConfirm(false);
      setTodo(null);
    }
  };

  return {
    todo,
    open,
    handleTodoClose,
    onSubmit,
    renderCell,
    handleAddChange,
    handleEndContentChange,
    toggleAlertHelper,
    handleConfirmClose,
    confirm,
  };
};

export default useTodos;
