import { Role } from "@/config/mapping_role";

export enum CanUsePermission {
  viewDashboard = "viewDashboard",
  addItem = "addItem",
  editItem = "editItem",
  addTodo = "addTodo",
  editTodo = "editTodo",
  downloadExcel = "downloadExcel",
  downloadWord = "downloadWord",
  viewMasters = "viewMasters",
  viewExtendedAttributes = "viewExtendedAttributes",
  viewRoles = "viewExtendedAttributes",
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
    CanUsePermission.viewMasters,
    CanUsePermission.viewExtendedAttributes,
    CanUsePermission.viewRoles,
  ],
  [Role.admin]: [
    CanUsePermission.viewDashboard,
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
    CanUsePermission.viewMasters,
  ],
  [Role.visualizer]: [
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
    CanUsePermission.addTodo,
    CanUsePermission.editTodo,
  ],
  [Role.executor]: [CanUsePermission.downloadExcel],
};

export const canUse = (userRole: string, action: string): boolean => {
  const permissions = rolePermissions[userRole] || [];

  return permissions.includes(action);
};
