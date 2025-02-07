import {
  AiOutlineUsergroupAdd,
  AiOutlineContainer,
  AiOutlineReconciliation,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { signOut } from "next-auth/react";
import { RiShutDownLine } from "react-icons/ri";

import { Role } from "@/config/mapping_role";

export interface IconProps {
  size: number;
  className: string;
}

export interface MenuOptions {
  title: string;
  role: string[];
  redirectTo?: string | undefined;
  Icon?: (props: IconProps) => JSX.Element;
  isSubmodule?: boolean;
  group?: string;
  onEvent?: () => Promise<void>;
}

const onlyAdmins: string[] = [Role["super-admin"], Role.admin];
const allRoles: string[] = [
  Role["super-admin"],
  Role.admin,
  Role.visualizer,
  Role.executor,
];

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
    title: "Reportes",
    role: allRoles,
    redirectTo: "/admin",
    Icon: (props) => <AiOutlineHome {...props} />,
    group: group.general,
  },
  {
    title: "Módulos",
    role: [...onlyAdmins, Role.visualizer],
    redirectTo: "/admin/modulos",
    isSubmodule: true,
    Icon: (props) => <AiOutlineContainer {...props} />,
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
    title: "Usuarios",
    role: onlyAdmins,
    redirectTo: "/admin/usuarios",
    Icon: (props) => <AiOutlineUsergroupAdd {...props} />,
    group: group.configuration,
  },
  {
    title: "Ajustes",
    role: [...onlyAdmins],
    redirectTo: "/admin/ajustes",
    Icon: (props) => <AiOutlineSetting {...props} />,
    group: group.configuration,
  },
  {
    title: "Cerrar sesión",
    role: [...allRoles],
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
