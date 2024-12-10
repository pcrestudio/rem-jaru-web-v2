import { Role } from "@/config/mapping_role";
import {
  AiOutlineUsergroupAdd,
  AiOutlineContainer,
  AiOutlinePieChart,
  AiOutlineReconciliation,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { signOut } from "next-auth/react";

export interface MenuOptions {
  title: string;
  role: string[];
  redirectTo?: string | undefined;
  Icon?: () => JSX.Element;
  isMultiple?: boolean;
  group?: string;
  onEvent?: () => Promise<void>;
}

const onlyAdmins: string[] = [Role["super-admin"], Role.admin];
const allRoles: string[] = [Role["super-admin"], Role.admin, Role.visualizer];
const iconSize: string = "16";

const logout = async () => {
  await signOut({
    redirect: true,
    callbackUrl: "/auth",
  });
};

const group = {
  general: "General",
  configuration: "Configuración",
  management: "Gestión",
  other: "Otros",
};

export const menuOptions: MenuOptions[] = [
  {
    title: "Dashboard",
    role: onlyAdmins,
    redirectTo: "/admin",
    Icon: () => <AiOutlineHome size={iconSize} />,
    group: group.general,
  },
  {
    title: "Módulos",
    role: [...onlyAdmins, Role.visualizer],
    redirectTo: "/admin/modulos",
    Icon: () => <AiOutlineContainer size={iconSize} />,
    isMultiple: true,
    group: group.general,
  },
  {
    title: "To-Dos",
    redirectTo: "/admin/todos",
    role: [...onlyAdmins, Role.visualizer],
    Icon: () => <AiOutlineReconciliation size={iconSize} />,
    group: group.general,
  },
  {
    title: "Reportes",
    role: allRoles,
    redirectTo: "/admin/reportes",
    Icon: () => <AiOutlinePieChart size={iconSize} />,
    group: group.management,
  },
  {
    title: "Usuarios",
    role: onlyAdmins,
    redirectTo: "/admin/usuarios",
    Icon: () => <AiOutlineUsergroupAdd size={iconSize} />,
    group: group.configuration,
  },
  {
    title: "Ajustes",
    role: [Role["super-admin"]],
    redirectTo: "/admin/ajustes",
    Icon: () => <AiOutlineSetting size={iconSize} />,
    group: group.configuration,
  },
  {
    title: "Cerrar sesión",
    role: [Role["super-admin"]],
    redirectTo: undefined,
    Icon: () => <AiOutlineSetting size={iconSize} />,
    group: group.other,
    onEvent: logout,
  },
];

export const groupedOptions = menuOptions.reduce((acc, item) => {
  const { group } = item;
  if (!acc[group]) {
    acc[group] = [];
  }
  acc[group].push(item);
  return acc;
}, {});

export const grouped = Object.entries(groupedOptions || {}).filter(
  ([_, options]) => Array.isArray(options) && options.length > 0,
);
