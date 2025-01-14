import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import TodoModal from "@/app/admin/todos/components/todo-modal-form/TodoModalForm";
import { todoColumns } from "@/app/admin/todos/components/todo-datagrid/columns/todoColumns";
import useTodos from "@/app/admin/todos/states/useTodos";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";

const TodoDataGrid = () => {
  const {
    todo,
    handleTodoClose,
    handleAddChange,
    renderCell,
    onSubmit,
    open,
    handleEndContentChange,
    confirm,
    toggleAlertHelper,
    handleConfirmClose,
  } = useTodos();

  return (
    <>
      <TodoModal
        endContentOnChange={handleEndContentChange}
        handleSubmit={onSubmit}
        isOpen={open}
        title={todo ? "Editar To-Do" : "Nuevo To-Do"}
        todo={todo}
        onCloseChange={handleTodoClose}
      />
      <ConfirmModal
        description={{
          __html: `La alerta será enviada luego de la confirmación, apróximadamente entre 30 segundos a 1 minuto.`,
        }}
        isOpen={confirm}
        title={`Alertar To-Do`}
        onClose={handleConfirmClose}
        onConfirm={() => toggleAlertHelper(todo?.id)}
      />

      <CustomDataGrid<GetTodosInstanceDto>
        cells={renderCell}
        columns={todoColumns}
        dataGridKey="id"
        emptyContent="Sin tareas por completar."
        endpointUrl="todos?"
        onAddChange={handleAddChange}
      />
    </>
  );
};

export default TodoDataGrid;
