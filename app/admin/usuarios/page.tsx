import UserDataGrid from "@/app/admin/usuarios/components/user-datagrid/UserDataGrid";

export default function Usuarios() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-jaruColor-on-surface">
          Usuarios
        </h1>
        <UserDataGrid />
      </div>
    </>
  );
}
