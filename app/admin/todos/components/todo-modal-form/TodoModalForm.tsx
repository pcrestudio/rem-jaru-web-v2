import React, { FC } from "react";
import { Button } from "@heroui/button";
import { HiBellAlert } from "react-icons/hi2";

import TodoActivities from "../TodoActivities/TodoActivities";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import createTodoValidationSchema from "@/app/validations/create-todo.validation";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import ReactiveDatePicker from "@/components/form/ReactiveDatePicker";
import { MasterTodosStates } from "@/config/master-todos-states.config";
import { ModalProps } from "@/app/admin/types/ModalProps";
import ResponsibleAutocomplete from "@/components/autocompletes/ResponsibleAutocomplete";
import ReactiveCheckbox from "@/components/form/ReactiveCheckbox";
import ReactiveTextArea from "@/components/form/ReactiveTextArea";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import useStore from "@/lib/store";
import { showAllDossiers } from "@/config/menu-options";

export interface TodoModalProps extends ModalProps {
  todo?: GetTodoDto;
  endContentOnChange?: () => void;
}

const mappingSemaphore: Record<MasterTodosStates, string> = {
  [MasterTodosStates.expired]: "bg-[#e53935]",
  [MasterTodosStates.lessThanTwoWeeks]: "bg-[#fdd835]",
  [MasterTodosStates.moreThanTwoWeeks]: "bg-[#43a047]",
};

const mappingSemaphoreText: Record<MasterTodosStates, string> = {
  [MasterTodosStates.expired]: "text-white",
  [MasterTodosStates.lessThanTwoWeeks]: "text-foreground",
  [MasterTodosStates.moreThanTwoWeeks]: "text-foreground",
};

const TodoModal: FC<TodoModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  todo,
  stopEventPropagation = true,
  endContentOnChange,
}) => {
  const { user } = useStore();

  return (
    <FormDialog
      canUse={
        (canUse(user.role, CanUsePermission.editTodo) ||
          canUse(user.role, CanUsePermission.addTodo)) &&
        !todo?.check
      }
      formId="todo-form"
      initialValues={todo}
      isOpen={isOpen}
      modalDialogHeaderContent={
        todo ? (
          <div
            className={`${mappingSemaphore[todo.state.slug]} px-6 py-4 flex flex-col gap-2`}
          >
            <div className="flex flex-row gap-4 items-center">
              <p className={`${mappingSemaphoreText[todo.state.slug]}`}>
                {todo && "Editar To-Do"}
              </p>
              {todo.alert && (
                <HiBellAlert
                  className={`${mappingSemaphoreText[todo.state.slug]}`}
                  size={20}
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <small
                className={`${mappingSemaphoreText[todo.state.slug]} text-xs`}
              >
                Módulo: {todo?.detail.submodule.module.name}
              </small>
              <small
                className={`${mappingSemaphoreText[todo.state.slug]} text-xs`}
              >
                Submódulo:{" "}
                {`${todo?.detail.submodule.module.name} ${todo?.detail.submodule.name}`}
              </small>
            </div>
          </div>
        ) : undefined
      }
      modalEndContent={
        (todo && !todo.alert) ||
        (todo &&
          todo.check &&
          todo.state.slug === MasterTodosStates.lessThanTwoWeeks) ||
        (showAllDossiers.includes(user?.role) && user.studioId === 0 && (
          <Button
            color="warning"
            type="button"
            variant="flat"
            onClick={endContentOnChange}
          >
            Alertar
          </Button>
        ))
      }
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createTodoValidationSchema}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, touchedFields, control }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          {todo && (
            <ReactiveCheckbox
              className="col-span-12"
              control={control}
              disabled={todo?.check ?? false}
              isSelected={todo?.check ?? false}
              label={todo?.check ? "To-Do completado" : "Completar"}
              name="check"
              register={register}
            />
          )}

          <ReactiveField
            className="col-span-12"
            control={control}
            errors={errors}
            isRequired={true}
            label="Nombre"
            name="title"
            register={register}
            touched={touchedFields.title}
          />

          <ReactiveTextArea
            className="col-span-12 nextui-textarea-nomodal"
            control={control}
            errors={errors}
            isRequired={true}
            label="Descripción"
            name="description"
            register={register}
            touched={touchedFields.description}
          />

          <ResponsibleAutocomplete
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Responsable principal"
            name="responsibleId"
          />

          <ReactiveDatePicker
            className="col-span-6 nextui-input-nomodal"
            control={control}
            isRequired={true}
            label="Fecha de vencimiento"
            name="dateExpiration"
            register={register}
          />

          {todo && <TodoActivities todo={todo} />}
        </div>
      )}
    </FormDialog>
  );
};

export default TodoModal;
