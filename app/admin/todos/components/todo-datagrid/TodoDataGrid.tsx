import CustomDataGrid from "@/components/shared/custom-datagrid/CustomDataGrid";
import { GetTodosInstanceDto } from "@/app/dto/todos/get-todos-instance.dto";
import TodoModal from "@/app/admin/todos/components/todo-modal-form/TodoModalForm";
import { todoColumns } from "@/app/admin/todos/components/todo-datagrid/columns/todoColumns";
import useTodos from "@/app/admin/todos/states/useTodos";
import ConfirmModal from "@/components/confirm-modal/ConfirmModal";
import useStore from "@/lib/store";
import { showAllDossiers } from "@/config/menu-options";
import BackdropLoading from "@/app/commons/components/BackdropLoading/BackdropLoading";

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
    handleDeleteConfirmClose,
    deleteConfirm,
    toggleAlertHelper,
    toggleDeleteHelper,
    handleConfirmClose,
    loading,
  } = useTodos({ isTodoPath: true });

  const { user } = useStore();

  const filterByStudio =
    showAllDossiers.includes(user?.role) && user.studioId === 0
      ? null
      : user.studioId
        ? `cargoStudioId=${user.studioId}&`
        : `cargoStudioId=0&`;

  return (
    <>
      <BackdropLoading loading={loading} />

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
          __html: `¿Deseas eliminar el To-Do, esta acción no se podrá revertir.`,
        }}
        isOpen={deleteConfirm}
        title={`Eliminar To-Do`}
        onClose={handleDeleteConfirmClose}
        onConfirm={() => toggleDeleteHelper(todo?.id)}
      />

      <ConfirmModal
        description={{
          __html: `El To-Do está a punto de ser alertado. Pulsa confirmar para alertar.`,
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
        emptyContent="Sin tareas asignadas."
        endpointUrl={`todos?${filterByStudio ?? ""}`}
        onAddChange={handleAddChange}
      />
    </>
  );
};

export default TodoDataGrid;
