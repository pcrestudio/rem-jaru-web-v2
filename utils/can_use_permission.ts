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
  viewInstances = "viewInstances",
  addExtendedAttributes = "addExtendedAttributes",
  editExtendedAttributes = "editExtendedAttributes",
  addSectionExtendedAttributes = "addSectionExtendedAttributes",
  editExtendedAttributesOptions = "editExtendedAttributesOptions",
  addSectionMaster = "addSectionMaster",
  addMaster = "addMaster",
  viewRoles = "viewRoles",
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
    CanUsePermission.viewInstances,
    CanUsePermission.viewRoles,
    CanUsePermission.addSectionExtendedAttributes,
    CanUsePermission.addExtendedAttributes,
    CanUsePermission.editExtendedAttributes,
    CanUsePermission.editExtendedAttributesOptions,
    CanUsePermission.addMaster,
    CanUsePermission.addSectionMaster,
  ],
  [Role.admin]: [
    CanUsePermission.viewDashboard,
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
    CanUsePermission.editTodo,
    CanUsePermission.viewMasters,
    CanUsePermission.viewExtendedAttributes,
    CanUsePermission.viewInstances,
    CanUsePermission.editExtendedAttributesOptions,
  ],
  [Role.visualizer]: [
    CanUsePermission.downloadExcel,
    CanUsePermission.downloadWord,
    CanUsePermission.downloadWord,
    CanUsePermission.addTodo,
    CanUsePermission.addItem,
    CanUsePermission.editItem,
  ],
  [Role.executor]: [CanUsePermission.downloadExcel, CanUsePermission.editTodo],
};

export const canUse = (userRole: string, action: string): boolean => {
  const permissions = rolePermissions[userRole] || [];

  return permissions.includes(action);
};
