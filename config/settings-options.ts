import { IUser } from "@/app/admin/usuarios/interfaces";
import { canUse, CanUsePermission } from "@/utils/can_use_permission";

export interface OptionCard {
  order: number;
  path: string;
  name: string;
  isDisabled: (user?: Partial<IUser>) => boolean;
}

export const settingsOptions: OptionCard[] = [
  {
    order: 1,
    path: "maestros",
    name: "Maestros",
    isDisabled: (user: IUser) =>
      !canUse(user.role, CanUsePermission.viewMasters),
  },
  {
    order: 2,
    path: "terminos",
    name: "Términos y Condiciones",
    isDisabled: () => false,
  },
  {
    order: 3,
    path: "personalizar",
    name: "Personalizar formularios",
    isDisabled: (user: IUser) =>
      !canUse(user.role, CanUsePermission.viewExtendedAttributes),
  },
  {
    order: 4,
    path: "instancias",
    name: "Personalizar instancias",
    isDisabled: (user: IUser) =>
      !canUse(user.role, CanUsePermission.viewInstances),
  },
  {
    order: 5,
    path: "roles",
    name: "Roles",
    isDisabled: (user: IUser) => !canUse(user.role, CanUsePermission.viewRoles),
  },
];
