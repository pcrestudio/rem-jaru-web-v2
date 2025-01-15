import React, { FC } from "react";
import useSWR from "swr";
import { Button } from "@nextui-org/button";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import createTodoValidationSchema from "@/app/validations/create-todo.validation";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import ReactiveDatePicker from "@/components/form/ReactiveDatePicker";
import { CustomDataGridPagination } from "@/app/admin/types/CustomDataGridPagination";
import { GetUserDto } from "@/app/dto/get-user.dto";
import { MasterTodosStates } from "@/config/master-todos-states.config";
import { ModalProps } from "@/app/admin/types/ModalProps";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";
import useStore from "@/lib/store";

export interface TodoModalProps extends ModalProps {
  todo?: GetTodoDto;
  endContentOnChange?: () => void;
}

const TodoModal: FC<TodoModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  todo,
  stopEventPropagation = true,
  endContentOnChange,
}) => {
  const { data } = useSWR<CustomDataGridPagination<GetUserDto>>(
    `${environment.baseUrl}/users`,
    fetcher,
  );
  const { user } = useStore();

  return (
    <FormDialog
      formId="todo-form"
      initialValues={todo}
      isOpen={isOpen}
      canUse={
        canUse(user.role, CanUsePermission.editTodo) ||
        canUse(user.role, CanUsePermission.addTodo)
      }
      modalEndContent={
        todo &&
        !todo.alert &&
        todo.state.slug === MasterTodosStates.lessThanTwoWeeks && (
          <Button
            color="warning"
            type="button"
            variant="flat"
            onClick={endContentOnChange}
          >
            Alertar
          </Button>
        )
      }
      stopEventPropagation={stopEventPropagation}
      title={title}
      validationSchema={createTodoValidationSchema}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
    >
      {({ register, errors, touchedFields, control }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
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

          <ReactiveField
            className="col-span-12"
            control={control}
            errors={errors}
            isRequired={true}
            label="Descripción"
            name="description"
            register={register}
            touched={touchedFields.description}
          />

          <AsyncAutocomplete
            noModal
            className="col-span-6"
            control={control}
            errors={errors}
            isRequired={true}
            itemLabel="firstName"
            itemValue="id"
            items={data?.results ?? []}
            label="Responsable"
            name="responsibleId"
            register={register}
            touched={touchedFields.targetAttributeId}
          />

          <ReactiveDatePicker
            className="col-span-6"
            control={control}
            isRequired={true}
            label="Fecha de vencimiento"
            name="dateExpiration"
            register={register}
          />
        </div>
      )}
    </FormDialog>
  );
};

export default TodoModal;
