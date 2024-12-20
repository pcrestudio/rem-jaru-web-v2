import React, { FC } from "react";
import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import createTodoValidationSchema from "@/app/validations/create-todo.validation";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import { MasterOptionConfig } from "@/config/master-option.config";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
import useSWR from "swr";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";

export interface TodoModalProps {
  isOpen: boolean;
  onCloseChange: () => void;
  title: string;
  handleSubmit?: (data: any) => void;
  todo?: GetTodoDto;
  stopEventPropagation?: boolean;
}

const TodoModal: FC<TodoModalProps> = ({
  isOpen,
  onCloseChange,
  handleSubmit,
  title,
  todo,
  stopEventPropagation = true,
}) => {
  const { data } = useSWR<any>(`${environment.baseUrl}/auth/users`, fetcher);

  return (
    <FormDialog
      formId="todo-form"
      stopEventPropagation={stopEventPropagation}
      isOpen={isOpen}
      onCloseChange={onCloseChange}
      onSubmit={handleSubmit}
      title={title}
      validationSchema={createTodoValidationSchema}
      initialValues={todo}
    >
      {({ register, errors, touchedFields, control, isValid }) => (
        <div className="grid grid-cols-12 gap-4 px-6">
          <ReactiveField
            isRequired={true}
            name="title"
            label="Nombre"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.title}
            className="col-span-12"
          />

          <ReactiveField
            isRequired={true}
            name="description"
            label="Descripción"
            register={register}
            control={control}
            errors={errors}
            touched={touchedFields.description}
            className="col-span-12"
          />

          <AsyncAutocomplete
            name="responsibleId"
            isRequired={true}
            control={control}
            register={register}
            errors={errors}
            touched={touchedFields.targetAttributeId}
            items={data?.results ?? []}
            className="col-span-6"
            noModal
            label="Responsable"
            itemLabel="firstName"
            itemValue="id"
          />

          <DynamicAutocomplete
            isRequired={true}
            name="todoStateId"
            label="Estado"
            className="col-span-6"
            slug={MasterOptionConfig.todoEstados}
            control={control}
            noModal
          />
        </div>
      )}
    </FormDialog>
  );
};

export default TodoModal;
