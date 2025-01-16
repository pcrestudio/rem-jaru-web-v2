import { Role } from "@/config/mapping_role";

export enum CanUsePermission {
  viewDashboard = "viewDashboard",
  addItem = "addItem",
  editItem = "editItem",
  addTodo = "addTodo",
  editTodo = "editTodo",
  downloadExcel = "downloadExcel",
  downloadWord = "downloadWord",
}

const rolePermissions = {
  [Role["super-admin"]]: [
    CanUsePermission.viewDashboard,
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
    CanUsePermission.addItem,
    CanUsePermission.editItem,
    CanUsePermission.addTodo,
    CanUsePermission.editTodo,
  ],
  [Role.admin]: [
    CanUsePermission.viewDashboard,
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
  ],
  [Role.visualizer]: [
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
    CanUsePermission.addTodo,
    CanUsePermission.editTodo,
  ],
  [Role.executor]: [CanUsePermission.downloadExcel],
};

export const canUse = (userRole: string, action: string) => {
  const permissions = rolePermissions[userRole] || [];

  return permissions.includes(action);
};
