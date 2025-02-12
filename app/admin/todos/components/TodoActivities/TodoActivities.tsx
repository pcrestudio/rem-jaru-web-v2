import { Avatar, Textarea } from "@heroui/react";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { IoIosSend } from "react-icons/io";
import toast from "react-hot-toast";
import { mutate } from "swr";

import useStore from "@/lib/store";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import { deleteActivity, upsertTodoActivity } from "@/app/api/todo/todo";
import { UpsertTodoActivityDto } from "@/app/dto/todos/upsert-todo-activity.dto";
import TodoActivitiesHistorial from "@/app/admin/todos/components/TodoActivitiesHistorial/TodoActivitiesHistorial";
import { GetTodoActivityDto } from "@/app/dto/todos/get-todo-activity.dto";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

interface TodoActivitiesProps {
  todo: GetTodoDto;
}

const TodoActivities: FC<TodoActivitiesProps> = ({ todo }) => {
  const { user } = useStore();

  const [confirm, setConfirm] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const placeholder = "Escribe un comentario";
  const [_, setSelectedFile] = useState<string | null>(null);
  const [todoActivity, setTodoActivity] = useState<GetTodoActivityDto | null>(
    null,
  );

  const adjustHeight = () => {
    const textarea = textAreaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      setSelectedFile(file.name);
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleClick = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setTodoActivity(null);
        setFormData(null);
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditActivity = (activity: GetTodoActivityDto) => {
    setTodoActivity(activity);
    setExpanded(true);
  };

  const handleDeleteActivity = (activity: GetTodoActivityDto) => {
    setConfirm(true);
    setTodoActivity(activity);
  };

  const handleTodoActivityConfirmClose = () => {
    setTodoActivity(null);
    setConfirm(false);
  };

  const toggleTodoActivityDelete = async () => {
    const { data } = await deleteActivity(todoActivity?.id);

    if (data) {
      toast.success("Actividad eliminada");

      return setConfirm(false);
    }
  };

  const onSubmit = async () => {
    const payload = formData as UpsertTodoActivityDto;

    if (todoActivity?.id) {
      const { data } = await upsertTodoActivity({
        activity: payload.activity,
        file: payload.file,
        responsibleId: user?.id,
        todoId: todo?.id,
        id: todoActivity?.id,
      });

      if (data) {
        toast.success("Actividad actualizada");
        setFormData(null);
        setTodoActivity(null);

        mutate(`/api/todos/${todo.id}/activities`);
      }
    } else {
      const { data } = await upsertTodoActivity({
        activity: payload.activity,
        file: payload.file,
        responsibleId: user?.id,
        todoId: todo?.id,
      });

      if (data) {
        toast.success("Actividad creada");
        setFormData(null);
      }
    }
  };

  useEffect(() => {
    if (todoActivity) {
      setFormData({
        activity: todoActivity.activity,
        file:
          typeof todoActivity?.file === "string" && todoActivity.file !== ""
            ? { name: todoActivity?.file }
            : todoActivity?.file,
      });
    }
  }, [todoActivity]);

  return (
    <>
      <ConfirmModal
        description={{
          __html: `¿Estás seguro de eliminar esta actividad, de tu To-Do asignado?`,
        }}
        isOpen={confirm}
        title={`Eliminar actividad de To-Do`}
        onClose={handleTodoActivityConfirmClose}
        onConfirm={toggleTodoActivityDelete}
      />

      <div
        ref={containerRef}
        className="col-span-12 flex flex-row gap-5 items-center my-5"
      >
        <Avatar isBordered color="primary" name={user?.displayName} />
        <div
          className="bg-[#F0F1F4] p-4 flex-1 cursor-pointer"
          role="presentation"
          onClick={() => setExpanded(true)}
        >
          {!expanded && <span className="text-xs">{placeholder}</span>}

          {expanded && (
            <div className="grid grid-cols-12">
              <div className="col-span-11 flex flex-col gap-5">
                <Textarea
                  ref={textAreaRef}
                  classNames={{
                    inputWrapper:
                      "shadow-none bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent p-0",
                    input: "placeholder:text-xs text-xs p-0",
                  }}
                  name="activity"
                  placeholder={placeholder}
                  rows={1}
                  style={{
                    resize: "none",
                    overflow: "hidden",
                  }}
                  value={formData?.activity || ""}
                  onChange={handleInputChange}
                  onInput={adjustHeight}
                />

                <div
                  className="flex flex-row gap-1 items-center"
                  role="presentation"
                  onClick={handleClick}
                >
                  <AiOutlineFileAdd className="text-blue-500" />
                  <span className="text-blue-500 text-xs font-bold">
                    {formData?.file?.name ||
                      formData?.file ||
                      "Incluir adjunto"}
                  </span>
                </div>

                <input
                  ref={fileRef}
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
                  name="file"
                  style={{ display: "none" }}
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-span-1">
                <IconButton
                  disabled={todo?.check}
                  type="button"
                  onClick={onSubmit}
                >
                  <IoIosSend
                    className={todo?.check ? "text-slate-300" : "text-blue-500"}
                  />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </div>

      <TodoActivitiesHistorial
        todo={todo}
        onDeleteActivity={handleDeleteActivity}
        onEditActivity={handleEditActivity}
      />
    </>
  );
};

export default TodoActivities;
