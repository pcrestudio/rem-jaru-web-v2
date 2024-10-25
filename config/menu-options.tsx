import { Role } from "@/config/mapping_role";
import {
  AiOutlineUsergroupAdd,
  AiOutlineContainer,
  AiOutlinePieChart,
  AiOutlineReconciliation,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";

export interface MenuOptions {
  title: string;
  role: string[];
  redirectTo: string;
  Icon?: () => JSX.Element;
  isMultiple?: boolean;
}

const onlyAdmins: string[] = [Role["super-admin"], Role.admin];
const allRoles: string[] = [Role["super-admin"], Role.admin, Role.visualizer];
const iconSize: string = "24";

export const menuOptions: MenuOptions[] = [
  {
    title: "Dashboard",
    role: onlyAdmins,
    redirectTo: "/admin",
    Icon: () => <AiOutlineHome size={iconSize} />,
  },
  {
    title: "Módulos",
    role: [...onlyAdmins, Role.visualizer],
    redirectTo: "/admin/modulos",
    Icon: () => <AiOutlineContainer size={iconSize} />,
    isMultiple: true,
  },
  {
    title: "To-Dos",
    redirectTo: "/admin/todos",
    role: [...onlyAdmins, Role.visualizer],
    Icon: () => <AiOutlineReconciliation size={iconSize} />,
  },
  {
    title: "Usuarios",
    role: onlyAdmins,
    redirectTo: "/admin/usuarios",
    Icon: () => <AiOutlineUsergroupAdd size={iconSize} />,
  },
  {
    title: "Reportes",
    role: [Role.visualizer],
    redirectTo: "/admin/reportes",
    Icon: () => <AiOutlinePieChart size={iconSize} />,
  },
  {
    title: "Ajustes",
    role: allRoles,
    redirectTo: "/admin/ajustes",
    Icon: () => <AiOutlineSetting size={iconSize} />,
  },
];
