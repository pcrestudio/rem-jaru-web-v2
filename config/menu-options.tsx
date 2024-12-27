import {
  AiOutlineUsergroupAdd,
  AiOutlineContainer,
  AiOutlinePieChart,
  AiOutlineReconciliation,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { signOut } from "next-auth/react";

import { Role } from "@/config/mapping_role";
import { RiShutDownLine } from "react-icons/ri";

export interface IconProps {
  size: number;
  className: string;
}

export interface MenuOptions {
  title: string;
  role: string[];
  redirectTo?: string | undefined;
  Icon?: (props: IconProps) => JSX.Element;
  isMultiple?: boolean;
  group?: string;
  onEvent?: () => Promise<void>;
}

const onlyAdmins: string[] = [Role["super-admin"], Role.admin];
const allRoles: string[] = [Role["super-admin"], Role.admin, Role.visualizer];

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
    Icon: (props) => <AiOutlineHome {...props} />,
    group: group.general,
  },
  {
    title: "Módulos",
    role: [...onlyAdmins, Role.visualizer],
    redirectTo: "/admin/modulos",
    Icon: (props) => <AiOutlineContainer {...props} />,
    isMultiple: true,
    group: group.general,
  },
  {
    title: "To-Dos",
    redirectTo: "/admin/todos",
    role: [...onlyAdmins, Role.visualizer],
    Icon: (props) => <AiOutlineReconciliation {...props} />,
    group: group.general,
  },
  {
    title: "Reportes",
    role: allRoles,
    redirectTo: "/admin/reportes",
    Icon: (props) => <AiOutlinePieChart {...props} />,
    group: group.management,
  },
  {
    title: "Usuarios",
    role: onlyAdmins,
    redirectTo: "/admin/usuarios",
    Icon: (props) => <AiOutlineUsergroupAdd {...props} />,
    group: group.configuration,
  },
  {
    title: "Ajustes",
    role: [Role["super-admin"]],
    redirectTo: "/admin/ajustes",
    Icon: (props) => <AiOutlineSetting {...props} />,
    group: group.configuration,
  },
  {
    title: "Cerrar sesión",
    role: [Role["super-admin"]],
    redirectTo: undefined,
    Icon: (props) => <RiShutDownLine {...props} />,
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
