import React, { FC } from "react";
import useSWR from "swr";

import ReactiveField from "@/components/form/ReactiveField";
import FormDialog from "@/components/shared/form-dialog/FormDialog";
import createTodoValidationSchema from "@/app/validations/create-todo.validation";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import { MasterOptionConfig } from "@/config/master-option.config";
import DynamicAutocomplete from "@/components/shared/master-options-autocompletes/DynamicAutocomplete";
import AsyncAutocomplete from "@/components/autocompletes/AsyncAutocomplete";
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
      initialValues={todo}
      isOpen={isOpen}
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

          <DynamicAutocomplete
            noModal
            className="col-span-6"
            control={control}
            isRequired={true}
            label="Estado"
            name="todoStateId"
            slug={MasterOptionConfig.todoEstados}
          />
        </div>
      )}
    </FormDialog>
  );
};

export default TodoModal;
