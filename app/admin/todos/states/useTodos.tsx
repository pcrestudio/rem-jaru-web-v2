import React, { useState } from "react";
import { Tooltip } from "@heroui/react";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";
import toast from "react-hot-toast";
import { HiOutlineBellAlert } from "react-icons/hi2";

import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import format_date from "@/utils/format_date";
import { UpsertTodoDto } from "@/app/dto/todos/upsert-todo-instance.dto";
import { alertTodo, deleteTodo, upsertTodo } from "@/app/api/todo/todo";
import TodoSemaphore from "@/app/admin/todos/components/todo-semaphore/TodoSemaphore";

interface UseTodosProps {
  todo: GetTodoDto;
  open: boolean;
  confirm: boolean;
  deleteConfirm: boolean;
  handleTodoClose: () => void;
  handleConfirmClose: () => void;
  handleDeleteConfirmClose: () => void;
  handleAddChange: () => void;
  handleEndContentChange: () => void;
  toggleAlertHelper: (todoId: number) => Promise<void>;
  toggleDeleteHelper: (todoId: number) => Promise<void>;
  renderCell: any;
  onSubmit: (payload: UpsertTodoDto, reset: any, event: any) => void;
}

const useTodos = (): UseTodosProps => {
  const [todo, setTodo] = useState<GetTodoDto>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
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

  const handleDeleteTodo = (todo: GetTodoDto) => {
    setTodo(todo);
    setDeleteConfirm(true);
  };

  const renderCell = React.useCallback(
    (item: GetTodoDto, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "fileCode":
          return item.detail ? item.detail.fileCode : "-";

        case "module":
          return item.detail ? item.detail.submodule.module.name : "-";

        case "submodule":
          return item.detail ? item.detail.submodule.name : "-";

        case "responsible":
          return item.responsible
            ? `${item.responsible.firstName} ${item.responsible.lastName}`
            : "-";

        case "dateExpiration":
          return item.dateExpiration
            ? `${format_date(new Date(item.dateExpiration))}`
            : "Sin fecha de vencimiento.";

        case "state":
          return item.state ? (
            <Tooltip content={item.state.name}>
              <TodoSemaphore slug={item.state.slug} />
            </Tooltip>
          ) : (
            "-"
          );

        case "alert":
          return item.alert ? <HiOutlineBellAlert size={20} /> : "-";

        case "check":
          return item.check ? "Completado" : "-";

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar To-Do">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => selectTodo(item)}
                >
                  <EditIcon />
                </span>
              </Tooltip>

              <Tooltip content="Eliminar To-Do">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  role="presentation"
                  onClick={() => handleDeleteTodo(item)}
                >
                  <DeleteIcon />
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

  const onSubmit = async (payload: UpsertTodoDto, _: any, event: any) => {
    if (event.target.id === "todo-form") {
      const { data } = await upsertTodo({
        title: payload.title,
        description: payload.description,
        entityReference: todo.entityReference,
        entityStepReference: todo.entityStepReference,
        todoStateId: Number(payload.todoStateId),
        responsibleId: Number(payload.responsibleId),
        dateExpiration: payload.dateExpiration,
        check: payload.check,
        id: todo ? todo.id : 0,
      });

      if (data) {
        toast.success("Todo modificado con éxito");

        return setOpen(false);
      }
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

  const handleDeleteConfirmClose = () => {
    setDeleteConfirm(false);
    setTodo(null);
  };

  const toggleDeleteHelper = async (todoId: number) => {
    const { data } = await deleteTodo(todoId);

    if (data) {
      toast.success("El todo ha sido eliminado.");
      setDeleteConfirm(false);
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
    toggleDeleteHelper,
    handleConfirmClose,
    handleDeleteConfirmClose,
    confirm,
    deleteConfirm,
  };
};

export default useTodos;
